import config from 'config'
import authenticateByProfile from '../lib/authenticateByProfile'
import { Strategy as TwitterStrategy } from 'passport-twitter'

export default models => (
    new TwitterStrategy({
        userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true',
        consumerKey: config.socials.twitter.client.id,
        consumerSecret: config.socials.twitter.client.secret,
        callbackURL: config.socials.twitter.callback.url,
        includeEmail: true,
        passReqToCallback: true
    },
    async (req, token, tokenSecret, profile, done) => {

        profile.profileUrl = `https://www.twitter.com/${profile._json.screen_name}`

        authenticateByProfile(models, req, profile, done)

    })
)
