import busboy from 'co-busboy'
import config from 'config'
import randomstring from 'randomstring'
import fs from 'fs'


export default (ctx) => function* (next) {

    if (!this.request.is('multipart/*')) {
        return yield* next
    }

    const parser = busboy(this, {
        autoFields: true
    })

    const tmp = `${config.dir}/public/upload/`
    if (!fs.existsSync(tmp)) fs.mkdirSync(tmp)
    

    let part

    while (part = yield parser) {
        if (part.mimeType.split('/')[0] === 'image' && part.filename) {
            const splits = part.filename.split('.')
            const ext = splits[splits.length - 1]
            const filename = `${randomstring.generate()}.${ext === 'blob' ? 'jpg' : ext}`
            const path = tmp + filename
            const stream = fs.createWriteStream(path)

            this.request.body[part.fieldname] = `/upload/${filename}`

            part.pipe(stream)

        }
    }

    for (const key in parser.fields) {
        this.request.body[parser.fields[key][0]] = parser.fields[key][1]
    }

    return yield* next
}
