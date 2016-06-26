import { deferConfig as defer } from 'config/defer'
export default {
    facebook: {
        client: {
            id: '219887715052731',
            secret: 'd0ab2dff238608072d21fc8152a7a4a5'
        },
        callback: {
            url: defer(function (cfg) {
                return `${cfg.https ? 'https' : 'http'}://${cfg.domain}/auth/facebook/callback`
            })
        }
    },
    vk: {
        client: {
            id: '5428950',
            secret: 'CHnkcYrJlp6B8BjXWdMD'
        },
        callback: {
            url: defer(function (cfg) {
                return `${cfg.https ? 'https' : 'http'}://${cfg.domain}/auth/vkontakte/callback`
            })
        }
    },
    twitter: {
        client: {
            id: '9dA9YurkgJhLwHsP94yLWYse6',
            secret: 'NVZp2xC86ZOMPWznqvbSi8nizG18WxUGD7tKUhrF3v89IXB920'
        },
        callback: {
            url: defer(function (cfg) {
                return `${cfg.https ? 'https' : 'http'}://${cfg.domain}/auth/twitter/callback`
            })
        }
    },
    google: {
        client: {
            id: '430755555598-i6ur2jmgu3etnn8004ais6163lam6ksm.apps.googleusercontent.com',
            secret: '1kLF2GAa7rk4WpI01IIstgdl',
            key: 'AIzaSyB0WKNsEIB2DpQwRhE6fyPgH7_t1wvXZyY'
        },
        callback: {
            url: defer(function (cfg) {
                return `${cfg.https ? 'https' : 'http'}://${cfg.domain}/auth/google/callback`
            })
        }
    },
    odnoklassniki: {
        client: {
            id: '1246879744',
            secret: '4147F17857128C98F23A2C5A',
            key: 'CBABOCFLEBABABABA'
        },
        callback: {
            url: defer(function (cfg) {
                return `${cfg.https ? 'https' : 'http'}://${cfg.domain}/auth/odnoklassniki/callback`
            })
        }
    }
}
