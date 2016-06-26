import Router from 'koa-router'
import passport from 'koa-passport'
import User from '../../../../models/user'
import recaptcha from 'simple-recaptcha-new'
import config from 'config'

const router = new Router()

router
    .post('/login', function* (next) {
        let ctx = this
        yield passport.authenticate('local', { badRequestMessage: 'Заполните, пожалуйста, оба поля.' },
        function* (err, user, info) {
            if (err) throw err
            if (user) {
                yield ctx.login(user)
            }
            switch (ctx.request.accepts('json', 'html', 'text')) {
            case 'json':
                if (info) {
                    ctx.body = { error: info.message }
                } else {
                    ctx.body = user
                }
                break

            case 'text':
            case 'html':
                if (info && info.message.length > 0) {
                    ctx.session.messages = ctx.session.messages || []
                    ctx.session.messages.push(info.message)
                }
                ctx.redirect('/')
                break

            default: this.throw(406, 'json, html, or text only')
            }

        }).call(this, next)
    })
    .post('/signup', function* () {
        let { displayName, email, phone, password, photo } = this.request.body
        try {
            let captcha = yield new Promise((done) => {
                recaptcha(config.recaptcha, this.request.ip, this.request.body.captcha, (err) => {
                    if (err) {
                        done(false)
                    }
                    done(true)
                })
            })
            if (captcha) {
                let result = yield User.create({
                    displayName: displayName,
                    email: email,
                    phone: phone,
                    password: password,
                    photo: photo,
                    verifiedEmail: false,
                    verifyEmailToken: Math.random().toString(36).slice(2, 10)
                })
                this.body = { error: false, result: result }
            } else {
                this.body = { error: { message: 'Вы пожожи на робота, попробуйте еще раз пройти проверку', code: 11111 } }
            }

        } catch (e) {
            if (e.code == 11000) {
                this.body = { error: { message: 'Пользователь с таким эл. адресом уже зарегистрирован', code: e.code } }
            } else {
                console.log('try error')
                console.error(e, e.stack)
                this.body = { error: e }
            }
        }


    })
    .get('/login', function* () {
        this.redirect('/')
    })

export default router.routes()
