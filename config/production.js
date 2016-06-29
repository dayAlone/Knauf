import config from './default'

export default {
    ...config,
    https: false,
    domain: '12tk.ru',
    port: 8080,
    db: {
        dialect: 'postgres',
        database: 'knauf',
        host: 'node110218-teploknauf.jelastic.regruhosting.ru',
        username: 'knauf',
        password: 'knauf@',
        port: 5432
    }
}
