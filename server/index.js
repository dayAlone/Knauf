import co from 'co'
import Koa from 'koa'
import config, { secret } from 'config'
import initMiddlewares from './middlewares'
import initControllers from './controllers'
import initModels from './models'
import initConnection from './libs/sequelize'

const app = new Koa()


app.keys = [secret]
app.proxy = true


co(function*() {
    const connection = yield initConnection()
    const models = yield initModels(connection)

    initMiddlewares(app, connection, models)
    initControllers(app, models)
    app.use(() => {
        this.models = models
    })
    app.listen(process.env.PORT || config.port)
})
.catch(err => console.log(err))
