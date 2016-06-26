import Router from 'koa-router'
import passport from 'koa-passport'
import addProviderRoute from '../../lib/addProviderRoute'

const router = new Router();
router
    .get('/login/', passport.authenticate('twitter', { scope: ['email'], display: 'popup' }))
    .get('/callback/', addProviderRoute('twitter', passport))

export default router.routes()
