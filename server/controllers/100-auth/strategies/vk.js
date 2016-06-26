import config from 'config'
import authenticateByProfile from '../lib/authenticateByProfile'
import { Strategy as VKontakteStrategy } from 'passport-vkontakte'

export default models => (
    new VKontakteStrategy({
        clientID: config.socials.vk.client.id,
        clientSecret: config.socials.vk.client.secret,
        callbackURL: config.socials.vk.callback.url,
        passReqToCallback: true,
        profileFields: ['id', 'verified', 'name', 'link', 'photo_max', 'email', 'sex', 'contacts'],
    },
    async (req, accessToken, refreshToken, params, profile, done) => {
        // Vkontakte gives email in oauthResponse, not in profile (which is 1 more request)
        if (!params.email) {
            done(null, false, { message: 'При входе разрешите доступ к эл. почте. Она используется для идентификации пользователя.' })
        }

        profile.emails = [
            { value: params.email }
        ]

        profile.realName = profile.displayName

        profile.photos = [{
            value: profile.photos[profile.photos.length - 1].value
        }]

        await authenticateByProfile(models, req, profile, done)

    })
)
