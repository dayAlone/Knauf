import favicon from 'koa-favicon'
import config from 'config'
export default () => (favicon(`${config.dir}/public/others/favicon.ico`))
