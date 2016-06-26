import Yourls from 'yourls'
import { api } from 'config'
const yourls = new Yourls(api.yourls.url, api.yourls.key)

export default (link, callback) => {
    yourls.shorten(link, (error, result) => {
        if (typeof callback === 'function') callback(result.shorturl)
    })
}
