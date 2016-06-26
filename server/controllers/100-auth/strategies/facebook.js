import config from 'config'
import authenticateByProfile from '../lib/authenticateByProfile'
import { Strategy as FacebookStrategy } from 'passport-facebook'

export default models => (
    new FacebookStrategy({
        clientID: config.socials.facebook.client.id,
        clientSecret: config.socials.facebook.client.secret,
        callbackURL: config.socials.facebook.callback.url,
        profileFields: ['id', 'verified', 'name', 'birthday', 'displayName', 'link', 'picture.type(large)', 'email', 'gender'],
        passReqToCallback: true
    },
    async (req, accessToken, refreshToken, params, profile, done) => {

        if (!profile._json.verified) {
            done(null, false, { message: 'Почта на facebook должна быть подтверждена' })
        }

        if (!profile.emails || !profile.emails[0]) { // user may allow authentication, but disable email access (e.g in fb)
            done(null, false, { message: 'При входе разрешите доступ к эл. почте. Она используется для идентификации пользователя.' })
        }

        profile.profileUrl = `https://www.facebook.com/${profile.id}`
        profile.realName = profile._json.name
        if (profile._json.picture && profile._json.picture.data.url.length > 0) {
            profile.photos = [{
                value: profile._json.picture.data.url
            }]
        }

        await authenticateByProfile(models, req, profile, done)

    })
)
