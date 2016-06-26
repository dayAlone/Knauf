import fs from 'fs'
import convert from 'koa-convert'

const excludes = [
    'index.js',
    '.DS_Store'
]

const middlewares = fs.readdirSync(__dirname).filter(file => !excludes.includes(file)).sort()

const use = (app, func, connection) => {
    if (typeof func === 'function') app.use(convert(func(connection)))
}

export default (app, connection) => {
    middlewares.forEach((middleware) => {
        const data = require(`./${middleware}`)
        if (data && Array.isArray(data)) {

            data.forEach(elem => {
                use(app, elem, connection)
            })
        } else {
            use(app, data, connection)
        }
    })
}
