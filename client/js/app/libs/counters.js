import Cookies from 'js-cookie'

class Counter {
    constructor() {
        this.maternal = 'as'
        this.project = document.getElementsByTagName('body')[0].getAttribute('data-hotellook-campaign')
        this.yaCounterName = 'yaCounter'
    }
    pageView() {
        const has_auid = typeof Cookies.get('auid') !== 'undefined'

        const that = this
        const callback = () => {
            that.metricks('loaded', {
                user_agent: window.navigator.userAgent,
                new_user: !has_auid,
                marker: new window.AviasalesMarker.Marker('cookies').marker,
                auid: Cookies.get('auid'),
                utm: {
                    media: window.variables.query.utm_media,
                    source: window.variables.query.utm_source,
                    content: window.variables.query.utm_content,
                    campaign: window.variables.query.utm_campaign
                },
                screen: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            })
        }
        if (has_auid) {
            callback()
        } else {
            window.auid.setNew(callback)
        }
    }
    yandex(name, params) {
        if (params == null) {
            params = {}
        }
        if (process.env.NODE_ENV !== 'production') {
            console.log('yandex goal', name, params)
            return
        }
        if (typeof window[this.yaCounterName] !== 'undefined' && window[this.yaCounterName] !== null) {
            window[this.yaCounterName].reachGoal(name, params)
            if (this.ycallback) {
                this.ycallback(name, params)
            }
        }
    }

    setGoal(name, category, params) {
        if (params == null) {
            params = {}
        }
        if (process.env.NODE_ENV !== 'production') {
            console.log('goal', name, params)
            return
        }
        this.metricks(name, params)
        this.yandex(name, params)
        this.google(name, category, params)
        this.mamka(name, params)
    }

    metricks() {
    }
    google(name, category, params) {
        if (params == null) {
            params = {}
        }
        if (process.env.NODE_ENV !== 'production') {
            console.log('google goal', name, category, params)
            return
        }
        if (typeof window.ga !== 'undefined' && window.ga !== null) {
            window.ga('send', {
                hitType: 'event',
                eventCategory: category,
                eventAction: name,
                params
            })
            if (Counter.gcallback) {
                Counter.gcallback(name, category, params)
            }
        }
    }
    mamka(name, params) {
        if (params == null) {
            params = {}
        }
        if (process.env.NODE_ENV !== 'production') {
            console.log('mamka goal', name, params)
            return
        }
        if (typeof window.mamka !== 'undefined' && window.mamka !== null) {
            window.mamka('send_event', {
                name,
                meta: params
            })
        }
    }
    setGoogleAnalyticsId(callback, tries) {
        if (tries == null) {
            tries = 0
        }
        if (this.googleAnalyticsId) {
            return this.googleAnalyticsId
        }
        const maxTries = 20
        const timeout = 500
        const that = this
        this.googleAnalyticsId = Cookies.get('_ga')
        if (this.googleAnalyticsId) {
            return callback(this.googleAnalyticsId)
        } else if (tries < maxTries) {
            tries++
            return setTimeout((() => {
                that.setGoogleAnalyticsId(callback, tries)
            }), timeout)
        }
        return true
    }
}

export default new Counter()
