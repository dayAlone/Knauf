import serve from 'koa-static-server'
import config from 'config'
const { folders: { dist: dist } } = config
export default [() => serve({ rootDir: dist, rootPath: '/layout/' }), () => serve({ rootDir: `${dist}upload/`, rootPath: '/upload/' })]
