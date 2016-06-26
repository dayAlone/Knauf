import Sequelize from 'sequelize'

import { db } from 'config'

export default function* () {
    let connection
    try {
        connection = new Sequelize(`${db.dialect}://${db.host}:${db.port}/${db.database}`, {
            dialect: 'postgres',
            logging: false
        })

        yield connection.authenticate()
    } catch (e) {
        if (e.message.indexOf('does not exist')) {
            const dbName = db.database
            const schema = `${db.host}:${db.port}/postgres`
            const pg = require('pg-promise')()(schema)
            yield pg.query(`CREATE DATABASE ${dbName}`)
            yield connection.authenticate()
        }
    }
    return connection
}
