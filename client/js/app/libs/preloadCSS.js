import { loadCSS } from 'fg-loadcss'
export default () => {

    const body = window.document.getElementsByTagName('body')[0]
    loadCSS(body.getAttribute('data-style'))
}
