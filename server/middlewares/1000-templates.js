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

        localsFull.social = {
            vkontakte: {
                short: 'vk',
                text: 'Вконтакте',
                link: 'https://vk.com/aviasalesru',
                utm: '?utm_source=share&utm_medium=vk_share&utm_content=share_button&utm_campaign='

            },
            facebook: {
                short: 'fb',
                text: 'Facebook',
                link: 'https://www.facebook.com/aviasales.ru',
                utm: '?utm_source=share&utm_medium=fb_share&utm_content=share_button&utm_campaign='

            },
            instagram: {
                short: 'inst',
                text: 'Instagram',
                link: 'https://instagram.com/aviasales',
            },
            twitter: {
                short: 'tw',
                text: 'Twitter',
                link: 'https://twitter.com/aviasales',
                utm: '?utm_source=share&utm_medium=tw_share&utm_content=share_button&utm_campaign=',
                shorts: {
                    gmo: 'http://avs.io/fea',
                    gaypride: 'http://avs.io/feb',
                    terror: 'http://avs.io/fed',
                    drugs: 'http://avs.io/fee',
                    winner: 'http://avs.io/fef'
                }
            },
            odnoklassniki: {
                short: 'ok',
                text: 'Одноклассники',
                link: 'https://ok.ru/aviasales',
                utm: '?utm_source=share&utm_medium=ok_share&utm_content=share_button&utm_campaign='
            },
            viber: {
                short: 'vbr',
                text: 'Viber',
            },
            google: {
                short: 'gp',
                text: 'Google+'
            },
        }

        const templatePathResolved = path.join(config.templates.root, `${templatePath}.pug`)
        return jade.renderFile(templatePathResolved, localsFull)
    }

    yield* next

}
