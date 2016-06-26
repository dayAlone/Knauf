import { STRING, BIGINT } from 'sequelize'

export default sequelize => function* () {
    const City = sequelize.define('cities', {
        id: {
            type: BIGINT,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: STRING,
            unique: true
        }
    })
    return City
}
