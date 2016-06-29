import config from './default'

export default {
    ...config,
    https: false,
    domain: '12tk.ru',
    port: 80,
    db: {
        dialect: 'postgres',
        database: 'knauf',
        host: 'node110218-teploknauf.jelastic.regruhosting.ru',
        username: '',
        password: '',
        port: 5432
    }
}
