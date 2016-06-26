import co from 'co'
import Koa from 'koa'
import config, { secret } from 'config'
import initMiddlewares from './middlewares'
import initControllers from './controllers'
import initModels from './models'
import initConnection from './libs/sequelize'

const app = new Koa()

import sendSms from './libs/sendSms'

app.keys = [secret]

co(function*() {
    const connection = yield initConnection()
    const models = yield initModels(connection)


//    let result = yield sendSms('+79658575587', 'test')
//    console.log(result)

    initMiddlewares(app, connection)
    initControllers(app, models)
    app.use(() => {
        this.models = models
    })
    app.listen(process.env.PORT || config.port)
})
.catch(err => console.log(err))
