import fs from 'fs'
const excludes = [
    'index.js',
    'fixtures',
    '_old',
    '.DS_Store'
]
const files = fs.readdirSync(__dirname)
    .filter(file => !excludes.includes(file))
    .map(file => file.replace('.js', ''))
    .sort()


export default function*(connection) {
    const models = {}
    try {
        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            const result = require(`./${file}`)
            const name = file.charAt(0).toUpperCase() + files[i].slice(- file.length + 1)
            if (typeof result === 'function') {
                models[name] = yield result(connection)
            }
        }
    } catch (err) {
        console.error(err)
    }

    return models
}
