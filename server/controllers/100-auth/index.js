import User from '../../models/user'
import passport from 'koa-passport'
import routes from './routes'
import initStrategies from './strategies'

export default function (app, models) {
    initStrategies(models)

    passport.serializeUser((user, done) => {
        done(null, user.id) // uses _id as idFieldd
    })
    passport.deserializeUser((id, done) => {
        //done(null, { id: 1, username: 'test' })
        models.User.findById(id).then(data => {
            done(null, data)
        })
    })

    app
        .use(passport.initialize())
        .use(passport.session())
        .use(routes)
}
