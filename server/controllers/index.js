import fs from 'fs'
const excludes = [
    'index.js'
]

export default (app, models) => {
    const files = fs.readdirSync(__dirname)
        .filter(file => !excludes.includes(file))
        .map(file => file.replace('.js', ''))
        .sort((a, b) => parseInt(a.match(/(\d{3,4})-/), 10) - parseInt(b.match(/(\d{3,4})-/), 10))
    files.forEach(file => {
        require(`./${file}`)(app, models)
    })

}
