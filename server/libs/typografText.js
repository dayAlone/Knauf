import Typograf from 'typograf'
export default (text) => {
    const tp = new Typograf({ lang: 'ru' })
    return tp.execute(text)
}
