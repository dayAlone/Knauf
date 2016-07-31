import Router from 'koa-router'
import co from 'co'
import config from 'config'
import request from 'request-promise'

export default function (app) {
    const router = new Router()
    router
        .get('/', async (ctx) => {
            const session = ctx.session
            const ip = ctx.request.header['x-real-ip']
            if (!session.geiop) {
                try {
                    session.geiop = await request.get({ url: `https://www.travelpayouts.com/whereami?ip=${ip || '93.158.134.3'}`, json: true })
                } catch (e) {
                    console.error(e)
                }
            }
            ctx.body = ctx.render('index', { place: session.geiop })

        })
    app.use(router.routes())
}
