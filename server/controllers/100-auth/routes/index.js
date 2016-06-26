import Router from 'koa-router'
import fs from 'fs'
import co from 'co'
const routes = fs.readdirSync(__dirname).filter(file => { return !['index.js'].includes(file) }).sort()
const router = new Router({ prefix: '/auth' })

routes.forEach(route => {
    const func = require(`./${route}`)
    if (typeof func === 'function') router.use(`/${route}`, func)
})

router
    .get(`/check`, co.wrap(function*(ctx) {
        ctx.body = { user: this.req.user ? this.req.user : false }
    }))
    .get('/logout', co.wrap(function* (ctx) {
        ctx.logout()
        ctx.redirect('/')
    }))

export default router.routes()
