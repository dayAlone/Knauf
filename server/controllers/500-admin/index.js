import Router from 'koa-router'

export default function (app, models) {
    const router = new Router()
    router
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
        .get('/admin/users/get/', async (ctx) => {
            const raw = await models.User.findAll({ include: [{ model: models.Code }, { model: models.Review }] })

            ctx.body = raw.map(el => ({
                ...el.dataValues,
                objects: el.objects.map(obj => `Регион: ${obj.region}\nАдрес: ${obj.address}\nФото: ${obj.photo}\n`).join('\n'),
                type: el.type === 'costumer' ? 'Конечный потребитель' : 'Бригадир',
                promoCode: el.code ? el.code.id : null,
                promoDateActivate: el.code ? el.code.dateActivate : null,
                reviewCreatedAt: el.review ? el.review.createdAt : null
            }))
        })
        .get('/admin/*', async (ctx) => {
            const texts = await models.Texts.findAll({ where: { active: true }, order: [['sort', 'ASC']] }).map(el => el.dataValues)
            ctx.body = ctx.render('admin', { texts })
        })

    app.use(router.routes())
}
