import { expires } from 'config'

import session from 'koa-generic-session'
import sequelizeStore from 'koa-session-sequelize'

export default (connection) => session({
    ttl: expires,
    store: sequelizeStore.create(connection)
})
