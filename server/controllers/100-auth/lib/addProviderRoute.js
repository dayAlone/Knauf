import co from 'co'
export default function (providerName, passport) {
    return co.wrap(function* (ctx) {
        let user
        let info

        yield passport.authenticate(providerName, (data, message) => {
            user = data
            info = message
        }).call(this, ctx)

        yield ctx.login(user)
        const error = info ? (info.message ? info.message : info) : false

        ctx.body = ctx.render('authCallback', { data: JSON.stringify({ error, user }) })
    })
}
