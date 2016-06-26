import passport from 'koa-passport'
import fs from 'fs'
const files = fs.readdirSync(__dirname)
    .filter(file => !['index.js'].includes(file))
    .map(file => file.replace('.js', ''))
    .sort()

export default models => {
    files.forEach(file => {
        passport.use(require(`./${file}`)(models))
    })
}
