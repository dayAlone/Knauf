import config from 'config'
import authenticateByProfile from '../lib/authenticateByProfile'
import { Strategy as OdnoklassnikiStrategy } from 'passport-odnoklassniki'

export default models => (
    new OdnoklassnikiStrategy({
        callbackURL: config.socials.odnoklassniki.callback.url,
        clientID: config.socials.odnoklassniki.client.id,
        clientPublic: config.socials.odnoklassniki.client.key,
        clientSecret: config.socials.odnoklassniki.client.secret,
        passReqToCallback: true
    },
    async (req, accessToken, refreshToken, profile, done) => {

        profile.emails = [
            { value: profile._json.email }
        ]

        await authenticateByProfile(models, req, profile, done)

    })
)
