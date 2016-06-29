import Router from 'koa-router'
import co from 'co'
import config from 'config'
import request from 'request-promise'

export default function (app) {
    const router = new Router()
    router
        .get('/', async (ctx) => {
            const session = ctx.session
            if (!session.geiop) {
                session.geiop = await request.get({ url: `http://freegeoip.net/json/${ctx.request.header['x-real-ip']}`, json: true })
            }
            ctx.body = session.geiop//ctx.render('index')
            /*
            const texts = {
                utm_campaign: {
                    code: 'utm_campaign',
                    value: 'patriot'
                },
                link_sal: {
                    code: 'link_sal',
                    value: 'https://aviasales.ru/?utm_source=landing&utm_medium=aviasales&utm_campaign=patriot'
                },
                title_page: {
                    code: 'title_page',
                    value: 'Выживи в Европе'
                },
                description: {
                    code: 'description',
                    value: 'Сколько ты протянешь в Европе?'
                },
                title_share: {
                    code: 'title_share',
                    value: 'Сыграй и узнай'
                },
                twitter_title: {
                    code: 'twitter_title',
                    value: 'Разыгрываем 150 000 миль на перелёты'
                }
            }
            //yield Texts.find({})
            let locals = {}
            for (let key in texts) {
                let v = texts[key].code.split('_')

                if (v.length > 0) {
                    switch (v.length) {
                    case 3:
                        if (!locals[v[0]]) locals[v[0]] = {}
                        if (!locals[v[0]][v[1]]) locals[v[0]][v[1]] = []
                        locals[v[0]][v[1]][parseInt(v[2], 10)] = texts[key].value
                        break
                    case 2:
                        if (!locals[v[0]]) locals[v[0]] = {}
                        locals[v[0]][v[1]] = texts[key].value
                        break
                    default:
                        locals[v[0]] = texts[key].value
                    }
                } else {
                    locals[key] = texts[key].value
                }
            }

            */
        })

        .get('/google8ff50d8e249290c3.html', co.wrap(function* (ctx) {
            ctx.body = 'google-site-verification: google8ff50d8e249290c3.html'
        }))
        .get('/yandex_52e23b4110a1d25e.html', co.wrap(function* (ctx) {
            ctx.body = '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body>Verification: 52e23b4110a1d25e</body></html>'
        }))
        .get('/sitemap.xml', co.wrap(function * (ctx) {
            ctx.body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://${config.domain}/</loc><lastmod>2005-04-28</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url></urlset>`
        }))
    app.use(router.routes())
}
