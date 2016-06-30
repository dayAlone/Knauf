import jade from 'pug'
import config from 'config'
import path from 'path'

export default () => function* (next) {

    this.locals = this.state

    this.render = (templatePath, locals) => {
        locals = locals || {}
        const localsFull = Object.create(this.locals)

        locals = {
            ...locals,
            dev: process.env.NODE_ENV === 'development',
            app: '/layout/js/index.js',
            domain: this.request.host,
            url: `https://${this.request.host}`,
            fullUrl: `https://${this.request.host}${this.request.url}`
        }

        for (const key in locals) {
            localsFull[key] = locals[key]
        }

        localsFull.env = process.env.NODE_ENV

        localsFull.query = this.query

        localsFull.user = this.req.user

        localsFull.cache = true

        const templatePathResolved = path.join(config.templates.root, `${templatePath}.pug`)
        return jade.renderFile(templatePathResolved, localsFull)
    }

    yield* next

}
