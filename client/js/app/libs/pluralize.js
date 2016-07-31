export default (number, lang) => {
    const { 0: one, 1: few, 2: many } = lang
    let { 3: other } = lang
    let ref = false
    let ref1 = false
    let ref2 = false
    let ref3 = false

    if (other === null) {
        other = few
    }
    if ((number % 10) === 1 && number % 100 !== 11) {
        return one
    }
    if (((ref = number % 10) === 2 || ref === 3 || ref === 4) && !((ref1 = number % 100) === 12 || ref1 === 13 || ref1 === 14)) {
        return few
    }
    if ((number % 10) === 0 || ((ref2 = number % 10) === 5 || ref2 === 6 || ref2 === 7 || ref2 === 8 || ref2 === 9) || ((ref3 = number % 100) === 11 || ref3 === 12 || ref3 === 13 || ref3 === 14)) {
        return many
    }
    return other
}
