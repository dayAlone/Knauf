function parseText(object, prefix = false, level = 0, sort = 0) {
    let result = {}
    if (typeof object === 'object') {
        const resourse = object.values || object
        let i = 1
        for (const key in resourse) {
            const current = {
                code: `${prefix ? `${prefix}_` : ''}${key}`,
                sort: sort + (1000 * i) / Math.pow(10, level),
                name: resourse[key].name || key.charAt(0).toUpperCase() + key.slice(1),
                level: level + 1,
                active: true
            }
            if (typeof resourse[key] === 'object' && !resourse[key].value) {
                result[current.code] = {
                    ...current,
                    type: 'section',
                }
                result = {
                    ...result,
                    ...parseText(resourse[key], current.code, current.level, current.sort)
                }
            } else {
                result[current.code] = {
                    ...current,
                    type: resourse[key].type || 'text',
                    value: resourse[key].value || resourse[key]
                }
            }
            i++
        }
    } else {
        result[prefix] = object
    }
    return result
}

export default parseText
