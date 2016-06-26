import { STRING, TEXT } from 'sequelize'

export default sequelize => function* () {
    const Sessions = sequelize.define('sessions', {
        id: {
            type: STRING,
            allowNull: false,
            autoIncrement: false,
            primaryKey: true
        },
        blob: TEXT
    })
    return Sessions
}
