import sendSms from '../../libs/sendSms'
import Router from 'koa-router'

export default function (app, models) {
    const router = new Router()
    router
        .all('/check/', async (ctx) => {
            const { phone, argument, reciver, keyword } = ctx.query
            const { Code, Seller } = models

            if (phone && phone.length > 0 && reciver === '3443') {

                let result
                const code = await Code.findOne({ where: { id: (keyword + argument).toUpperCase() } })

                if (code) {
                    if (code.active) {
                        const seller = await Seller.findOrCreate({ where: { phone: phone.match(/\d+/g).join('') } })

                        code.dateActivate = Date.now()
                        code.active = false

                        await code.save()
                        await code.setSeller(seller[0])

                        result = 'All good'

                    } else {
                        result = 'Code is already activated'
                    }

                } else {
                    result = 'Code not found'

                }
                await sendSms(`+${phone}`, result)
                ctx.body = result

            }

        })

    app.use(router.routes())
}
