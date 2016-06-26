import { BIGINT, BOOLEAN, STRING, DATE, JSON } from 'sequelize'
import config from 'config'
import crypto from 'crypto'
import transliterate from '../libs/transliterate'

const generateProfileName = (db, data, fn) => {
    const profileName = transliterate(
        data.displayName.trim()
            .replace(/<\/?[a-z].*?>/gim, '')  // strip tags, leave /<DIGIT/ like: 'IE<123'
            .replace(/[ \t\n!'#$%&'()*+,\-.\/:<=>?@[\\\]^_`{|}~]/g, '-') // пунктуация, пробелы -> дефис
            .replace(/[^a-zа-яё0-9-]/gi, '') // убрать любые символы, кроме [слов цифр дефиса])
            .replace(/-+/gi, '-') // слить дефисы вместе
            .replace(/^-|-$/g, '') // убрать дефисы с концов
            .toLowerCase()
    )
    return db.findAll({}).then(list => {
        data.profileName = `${profileName}${list.length > 0 ? list.length : ''}`
        fn(null, data)
    })
}

export default sequelize => function* () {
    const User = sequelize.define('users', {
        id: {
            type: BIGINT,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        auid: {
            type: STRING
        },
        active: {
            type: BOOLEAN,
            defaultValue: true
        },
        created: {
            type: DATE,
            defaultValue: Date.now
        },
        profileName: {
            type: STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [2, 64],
                    msg: 'Длина имени профиля должна быть больше 2 и меньше 64 символов'
                },
                symbols(value) {
                    if (!/^[a-z0-9-]*$/.test(value)) {
                        throw new Error('В имени профиля допустимы только буквы a-z, цифры и дефис.')
                    }
                },
                notEmpty: {
                    msg: 'Имя профиля не должен быть пустым.'
                }
            }
        },
        displayName: {
            type: STRING,
            defaultValue: ''
        },
        role: {
            type: STRING,
            defaultValue: 'user'
        },


        birthday: STRING,
        photo: STRING,
        phone: STRING,
        gender: {
            type: STRING,
            validate: {
                isGender(value) {
                    if (['male', 'female'].indexOf(value) === -1) {
                        throw new Error('Неизвестное значение для пола.')
                    }
                }
            }
        },

        email: {
            type: STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: {
                    msg: 'Укажите, пожалуйста, корректный email.'
                },
                notEmpty: {
                    msg: 'E-mail пользователя не должен быть пустым.'
                }
            }
        },
        newEmail: STRING,
        verifiedEmail: {
            type: BOOLEAN,
            defaultValue: false
        },
        verifiedEmailToken: STRING,
        password: {
            type: STRING,
            get() {
                return this.passwordPlain
            },
            set(password) {
                if (password) {
                    if (password.length < 4) {
                        throw new Error(`Пароль должен быть минимум 4 символа, а текущий ${password.length}.`)
                    }
                }

                this.passwordPlain = password

                if (password) {
                    this.salt = crypto.randomBytes(config.crypto.hash.length).toString('base64')
                    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, config.crypto.hash.iterations, config.crypto.hash.length)
                } else {
                    // remove password (unable to login w/ password any more, but can use providers)
                    this.salt = undefined
                    this.passwordHash = undefined
                }
            },
            validate: {
                len: {
                    args: [2, 64],
                    msg: 'Длина пароля должна быть больше 2 и меньше 64 символов'
                }
            }
        },
        passwordPlain: STRING,
        passwordResetToken: STRING,
        passwordHash: STRING,
        salt: STRING,

        providers: JSON

    }, {
        hooks: {
            beforeValidate(user, options, fn) {
                return generateProfileName(User, user, fn)
            }
        },
        instanceMethods: {
            checkPassword(password) {
                if (!password) return false // empty password means no login by password
                if (!this.passwordHash) return false // this user does not have password (the line below would hang!)

                return crypto.pbkdf2Sync(password, this.salt, config.crypto.hash.iterations, config.crypto.hash.length) == this.passwordHash
            }
        }
    })
    yield User.sync()
    return User
}
