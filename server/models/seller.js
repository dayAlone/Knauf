import { STRING, JSON, BIGINT } from 'sequelize'
import request from 'request-promise'

export default sequelize => function* () {
    const Seller = sequelize.define('sellers', {
        id: {
            type: BIGINT,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        phone: {
            type: STRING,
            unique: true
        },
        region: JSON
    }, {
        hooks: {
            beforeCreate: (seller, options, done) => {
                console.log(`get-phone-info=on&phone=${seller.phone}`)
                request
                    .post({ url: 'http://gsm-inform.ru/api/info/', json: true })
                    .form({
                        'get-phone-info': 'on',
                        phone: seller.phone
                    })
                    .then((json) => {

                        seller.region = {
                            operator: json.operator,
                            region: json.region,
                            country: json.country
                        }
                        done(null, seller)
                    })
            }
        }
    })
    return Seller
}
