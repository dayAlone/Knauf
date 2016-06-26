import rollbar from 'rollbar'
import config from 'config'
rollbar.init(config.api.rollbar)
export default () => function*(next) {
    try {
        yield* next
    } catch (e) {
        rollbar.handleError(e, this.request)
        if (e && e.status) {
            // could use template methods to render error page
            this.body = e.message
            this.statusCode = e.status
        } else {
            this.body = 'Error 500'
            this.statusCode = 500
            if (e) console.error(e.message, e.stack)
            else console.error('Error!')
        }
    }
}
