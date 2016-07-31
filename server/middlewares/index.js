import fs from 'fs'
import convert from 'koa-convert'

const excludes = [
    'index.js',
    '.DS_Store'
]

const middlewares = fs.readdirSync(__dirname).filter(file => !excludes.includes(file)).sort()

const use = (app, func, connection, models) => {
    if (typeof func === 'function') app.use(convert(func(connection, models)))
}

export default (app, connection, models) => {
    middlewares.forEach((middleware) => {
        const data = require(`./${middleware}`)
        if (data && Array.isArray(data)) {

            data.forEach(elem => {
                use(app, elem, connection, models)
            })
        } else {
            use(app, data, connection, models)
        }
    })
}
