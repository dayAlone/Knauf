import { STRING, BIGINT, FLOAT } from 'sequelize'

export default sequelize => function* () {
    const Store = sequelize.define('stores', {
        id: {
            type: BIGINT,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: STRING
        },
        latitude: FLOAT,
        longitude: FLOAT,
        address: STRING,
        phone: STRING,
        time: STRING

    })
    return Store
}
