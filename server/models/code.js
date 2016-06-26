import { STRING, DATE, BOOLEAN } from 'sequelize'

export default sequelize => function* () {
    const Code = sequelize.define('codes', {
        id: {
            type: STRING,
            primaryKey: true,
            unique: true,
            autoIncrement: false
        },
        dateSend: DATE,
        dateActivate: DATE,
        active: {
            type: BOOLEAN,
            defaultValue: true
        }

    })
    yield Code.sync()
    return Code
}
