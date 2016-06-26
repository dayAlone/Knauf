import { BIGINT, STRING, DATE, JSON } from 'sequelize'

export default sequelize => function* () {
    const User = sequelize.define('users', {
        id: {
            type: BIGINT,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },

        type: {
            type: STRING,
            validate: {
                isType(value) {
                    if (['costumer', 'foreman'].indexOf(value) === -1) {
                        throw new Error('Неизвестное значение для пола.')
                    }
                }
            }
        },

        nameFirst: {
            type: STRING,
            allowNull: false,
        },
        nameThird: {
            type: STRING,
            allowNull: false,
        },
        nameSecond: {
            type: STRING,
            allowNull: false,
        },


        city: {
            type: STRING,
            allowNull: false,
        },

        phone: {
            type: STRING,
            unique: true,
            allowNull: false
        },

        objects: {
            type: JSON,
            allowNull: false
        },

        reviewSms: DATE

    }, {
        hooks: {
            beforeCreate: (user, options, done) => {
                user.phone = user.phone.match(/\d+/g).join('')

                done(null, user)
            }
        }
    })
    return User
}
