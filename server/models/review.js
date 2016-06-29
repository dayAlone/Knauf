import { STRING, JSON, BIGINT, BOOLEAN } from 'sequelize'

export default sequelize => function* () {
    const Review = sequelize.define('reviews', {
        id: {
            type: BIGINT,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        object: JSON,
        file: STRING,
        winner: {
            type: BOOLEAN,
            defaultValue: false
        },
        winnerPlace: BIGINT,
        winnerCategory: STRING
    })
    return Review
}
