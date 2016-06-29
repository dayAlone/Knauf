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


        const { Code, User, Seller, City, Store, Review } = models

        User.hasOne(Code)
        User.hasOne(Review)
        Review.belongsTo(User)
        Code.belongsTo(Seller)
        Store.belongsTo(City)

        for (const id in models) {
            yield models[id].sync({force: true})
        }
        /*
            const code = yield Code.findOrCreate({ where: { id: 'KNKXFRAWHM' } })

            const user = yield User.findOrCreate({ where: {
                type: 'costumer',

                nameFirst: 'Андрей',
                nameSecond: 'Колмаков',
                nameThird: 'Владимирович',

                city: 'Челябинск',

                phone: '+7(965)85-75-587',


            }, defaults: {
                objects: [{
                    region: 'Челябинск',
                    address: 'ул. Пушкина, д. Колотушкина',
                    photo: 'http://ya.ru'
                }]
            } })

            yield user[0].setCode(code[0])

            const users = yield User.findAll({ include: [{
                model: Code,
            }] })
            console.log(users[0].dataValues)
        */

    } catch (err) {
        console.error(err)
    }

    return models
}
