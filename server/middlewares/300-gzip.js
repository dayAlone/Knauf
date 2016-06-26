import gzip from 'koa-compress'
import { Z_SYNC_FLUSH } from 'zlib'
export default () => gzip({
    flush: Z_SYNC_FLUSH
})
