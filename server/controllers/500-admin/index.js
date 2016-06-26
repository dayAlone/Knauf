import Router from 'koa-router'

export default function (app, models) {
    const router = new Router()
    router
        .get('/admin/', async (ctx) => {
            const texts = await models.Texts.findAll({ where: { active: true }, order: [['sort', 'ASC']] }).map(el => el.dataValues)
            ctx.body = ctx.render('admin', { texts })
        })
        .post('/admin/upload/', async (ctx) => {
            ctx.body = ctx.request.body

        })
        .post('/admin/save/', async (ctx) => {
            for (const key in ctx.request.body) {
                const text = await models.Texts.find({ where: { code: key } })
                if (text) {
                    await text.updateAttributes({ value: ctx.request.body[key] })
                }
            }
            const texts = await models.Texts.findAll({ where: { active: true }, order: [['sort', 'ASC']] }).map(el => el.dataValues)
            ctx.body = texts

        })

    app.use(router.routes())
}
