import Router from 'koa-router'
import passport from 'koa-passport'
import addProviderRoute from '../../lib/addProviderRoute'

const router = new Router()
router
    .get('/login/', passport.authenticate('odnoklassniki', { scope: ['GET_EMAIL'], display: 'popup' }))
    .get('/callback/', addProviderRoute('odnoklassniki', passport))

export default router.routes()
