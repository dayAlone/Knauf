import Router from 'koa-router'
import passport from 'koa-passport'
import addProviderRoute from '../../lib/addProviderRoute'

const router = new Router()
router
    .get('/login/', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.me', 'https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read'], display: 'popup' }))
    .get('/callback/', addProviderRoute('google', passport))

export default router.routes()
