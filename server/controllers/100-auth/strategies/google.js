import config from 'config'
import authenticateByProfile from '../lib/authenticateByProfile'
import { Strategy as GoogleStrategy } from 'passport-google-oauth2'

export default models => (
    new GoogleStrategy({
        clientID: config.socials.google.client.id,
        clientSecret: config.socials.google.client.secret,
        apiKey: config.socials.google.client.key,
        passReqToCallback: true,
        callbackURL: config.socials.google.callback.url
    },
    //async (req, accessToken, refreshToken, params, profile, done) => {
    async (req, accessToken, refreshToken, profile, done) => {

        if (!profile.displayName) profile.displayName = profile.email
        profile.realName = profile._json.nickname
        await authenticateByProfile(models, req, profile, done)

    })
)
