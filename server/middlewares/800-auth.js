import mount from 'koa-mount'
import auth from 'koa-basic-auth'
import { access } from 'config'

const tryAuth = async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        if (err.status === 401) {
            ctx.status = 401
            ctx.set('WWW-Authenticate', 'Basic')
            ctx.body = 'Nope... you need to authenticate first. With a proper user!'
        } else {
            throw err
        }
    }
}

export default [() => mount('/admin', tryAuth), () => mount('/admin', auth({ name: access.login, pass: access.password }))]
