import Sequelize from 'sequelize'

import { db } from 'config'

export default function* () {
    let connection
    try {
        connection = new Sequelize(db, {
            dialect: 'postgres',
            logging: false
        })

        yield connection.authenticate()
    } catch (e) {
        if (e.message.indexOf('does not exist')) {
            const dbName = db.split('/').slice(-1)
            const schema = `${db.split('/').slice(0, -1).join('/')}/postgres`
            const pg = require('pg-promise')()(schema)
            yield pg.query(`CREATE DATABASE ${dbName}`)
            yield connection.authenticate()
        }
    }
    return connection
}
