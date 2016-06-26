import { BIGINT, TEXT, STRING, BOOLEAN } from 'sequelize'
import { dir, api, folders } from 'config'
import randomstring from 'randomstring'
import path from 'path'
import url from 'url'
import yaml from 'js-yaml'
import fs from 'fs'

import tinify from 'tinify'
tinify.key = api.tinypng

import shortLink from '../libs/shortLink'
import typografText from '../libs/typografText'
import parseText from '../libs/parseTexts'

const prepareValue = (text, options, fn) => {
    switch (text.type) {
    case 'link':
        shortLink(text.value, (value) => {
            text.valueConverted = value
            fn(null, text)
        })
        break
    case 'section':
        text.valueConverted = null
        fn(null, text)
        break
    case 'image':
        if (text.value.length > 0) {
            let source
            let extention

            const folder = `${dir}${folders.dist.slice(1)}upload/min/`
            if (!fs.existsSync(folder)) fs.mkdirSync(folder)

            if (text.value.indexOf('http') !== -1) {
                source = tinify.fromUrl(text.value)
                extention = path.extname(url.parse(text.value).pathname)
            } else {
                const pathName = dir + folders.dist.slice(1) + text.value.slice(1)
                source = tinify.fromFile(pathName)
                extention = path.extname(pathName)
            }
            const filename = `${randomstring.generate()}${extention}`
            const dist = `${folder}${filename}`
            text.valueConverted = `/upload/min/${filename}`

            source
                .toFile(dist)
                //.then(() => fn(null, text))
            fn(null, text)
        }

        break
    default:
        text.valueConverted = typografText(text.value)
        fn(null, text)
    }

}

export default sequelize => function* () {

    const Text = sequelize.define('texts', {
        id: {
            type: BIGINT,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        active: {
            type: BOOLEAN,
            defaultValue: true
        },
        sort: BIGINT,
        level: BIGINT,
        code: {
            type: STRING,
            unique: true
        },
        name: TEXT,
        value: TEXT,
        valueConverted: {
            type: TEXT,
            defaultValue: null
        },
        type: {
            type: STRING,
            defaultValue: 'text'
        }
    }, {
        hooks: {
            beforeUpdate: prepareValue,
            beforeCreate: prepareValue
        }
    })
    yield Text.sync()
    const texts = parseText(yaml.load(fs.readFileSync(`${dir}/config/texts.yml`)))

    for (const key in texts) {
        const { 0: text, 1: created } = yield Text.findOrCreate({ where: { code: key }, defaults: texts[key] })
        if (!created) {
            let changed = false
            for (const el in texts[key]) {
                if (text[el] != texts[key][el]) {
                    if (el !== 'value' || (el === 'value' && new Date(text.updatedAt).getTime() === new Date(text.createdAt).getTime())) {
                        text[el] = texts[key][el]
                        changed = true
                    }
                }
            }
            if (changed) {
                yield text.save()

            }

        }
    }

    const disabled = yield Text.findAll({ where: { code: { $notIn: Object.keys(texts) } } })
    if (disabled.length > 0) {
        for (let i = 0; i < disabled.length; i++) {
            yield disabled[i].updateAttributes({ active: false })
        }
    }

    return Text
}
