export default (connection, models) => function* (next) {
    const texts = {}
    yield models.Texts.findAll({ where: { active: true }, order: [['sort', 'ASC']] })
        .filter(el => (el.type !== 'section'))
        .map(el => (texts[el.code] = el.dataValues.valueConverted))
    this.texts = texts
    yield* next
}
