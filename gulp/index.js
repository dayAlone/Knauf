import gulp from 'gulp'
import config from 'config'
import runSequence from 'run-sequence'

import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import WebpackDevServer from 'webpack-dev-server'

import nib from 'nib'

//PostCSS
import autoprefixer from 'autoprefixer'
import mqpacker from 'css-mqpacker'
import base64 from 'postcss-inline-base64'
import cssnano from 'cssnano'
import svg2png from 'gulp-svg2png'
import inlineimg from 'gulp-inline-image-html'
import rupture from 'rupture'
import gulpStylelint from 'gulp-stylelint'

const browserSync = require('browser-sync').create()
const { dir, folders: { dist: dist } } = config
const { nodemon, postcss, stylus, plumber, notify, svgmin, tinypngCompress: tinypng, if: gif, svgstore, rename, concat, cached, watch } = require('gulp-load-plugins')()
import responsiveValues from './postcss-responsive-with-coefficients'

const jsSource = ['client/js/**/*.js']
const imagesSource = ['client/images/**/*.jpg', 'client/images/**/*.gif', 'client/images/**/*.png', 'client/js/app/**/*.jpg', 'client/js/app/**/*.gif', 'client/js/app/**/*.png']
const stylSource = ['client/css/**/*.styl']//, 'client/js/app/containers/**/*.styl', 'client/js/app/components/**/*.styl']
const othersSource = 'client/others/**/*.*'
const fontsSource = 'client/fonts/**/*.*'
const htmlSource = 'client/templates/**/*.pug'
const svgSpriteSource = 'client/images/svg/sprite/*.svg'
const svgSource = [`!${svgSpriteSource}`, 'client/images/svg/**/*.svg', 'client/js/app/**/*.svg']

const NODE_ENV = process.env.NODE_ENV || 'development'

const stylusFunctions = (style) => {
    nib()(style)
    rupture()(style)
}

const svgMinConfig = [
    { convertStyleToAttrs: true },
    { moveGroupAttrsToElems: false },
    { removeUselessStrokeAndFill: false },
    { cleanupIDs: true },
    { removeComments: true },
    { moveGroupAttrsToElems: false },
    { convertPathData: { straightCurves: false } }
]

gulp.task('svg:optimize', () => (
    gulp
        .src(svgSource)
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(cached('svg:optimize'))
        .pipe(svgmin(svgMinConfig))
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest(`${dist}/images/svg/`))
))

gulp.task('svg:sprite', () => (
    gulp
        .src(svgSpriteSource)
        .pipe(svgmin(svgMinConfig))
        .pipe(rename(path => {
            if (path.basename.split('_').length > 1) {
                path.basename = path.basename.split('_')[1]
            }
            return path
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(`${dist}/images/svg/`))
))

gulp.task('images:optimize', () => (
    gulp
        .src(imagesSource)
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest(`${dist}/images/`))
))

gulp.task('images:tinypng', () => (

    gulp
        .src(imagesSource)
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(cached('images:tinypng'))
        .pipe(gif(NODE_ENV === 'production', tinypng({ key: config.api.tinypng })))
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest(`${dist}/images/`))
))

gulp.task('images:svg2png', () => {
    gulp
        .src('client/images/svg/png/*.svg')
        .pipe(svg2png(4))
        .pipe(gif(NODE_ENV === 'production', tinypng({ key: config.api.tinypng })))
        .pipe(gulp.dest(`${dist}/images/svg2png`))
})

gulp.task('images:generate_html_base64', () => {
    gulp
        .src('client/templates/images.html')
        .pipe(inlineimg(`${dist}/images/svg2png`))
        .pipe(gulp.dest(`${dist}/html`))
})

gulp.task('css:create', () => (
    gulp
        .src(stylSource)
        .pipe(concat('style.styl'))
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(stylus({
            paths: ['client/css/'],
            use: stylusFunctions,
            cache: true
        }))
        .pipe(postcss([responsiveValues()]))
        .pipe(gulp.dest(`${dist}/css/`))


))

gulp.task('css:min', () => (
    gulp
        .src(`${dist}/css/**/*.css`)
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(postcss([autoprefixer({ browsers: ['last 2 versions'] }), mqpacker({ sort: true }), base64({ baseDir: `${dist}/css/` }), cssnano()]))
        .pipe(gulp.dest(`${dist}/css/`))
))

gulp.task('css:lint', () => (
    gulp
        .src('public/css/style.css')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(gulpStylelint({
            configFile: './.stylelintrc',
            reporters: [
                { formatter: 'string', console: true }
            ]
        }))
))

gulp.task('webpack:server', () => {
    const server = new WebpackDevServer(webpack(require(`../webpack/${NODE_ENV}.js`)),
        {
            proxy: {
                '**': 'http://localhost:8000'
            },
            hot: true,
            inline: true,
            publicPath: '/layout/js/',
            stats: {
                chunk: false,
                chunkModules: false,
                version: false,
                colors: true,
                hash: false
            }
        })
    server.listen(8085)
})

gulp.task('scripts', () => (
    gulp
        .src('client/js/index.js')
        .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
        .pipe(webpackStream(require(`../webpack/${NODE_ENV}.js`)))
        .pipe(gulp.dest(`${dist}/js/`))
))

gulp.task('nodemon', () => (
    nodemon({
        nodeArgs: ['--debug'],
        script: 'index.js'
    })
))


gulp.task('svg', () => (runSequence('svg:optimize', 'svg:sprite')))
gulp.task('css', () => (runSequence('css:create', 'css:min')))
gulp.task('images', () => (runSequence('images:optimize', 'images:tinypng')))


gulp.task('fonts', () => (gulp.src(fontsSource).pipe(gulp.dest(`${dist}/fonts/`))))
gulp.task('others', () => (gulp.src(othersSource).pipe(gulp.dest(`${dist}/others/`))))
gulp.task('server:update', () => (browserSync.reload('/layout/css/style.css')))
gulp.task('server:reload', () => (browserSync.reload()))
gulp.task('server:start', () => (browserSync.init({ proxy: config.domain, port: 8000, open: false })))
gulp.task('fetch_texts_from_prod', () => {
    const shell = require('shelljs')
    const dbDev = require('../config/default.js').db
    const dbProd = require('../config/production.js').db
    const dumpfile = './i18n.dump'
    const production = dbProd.name
    const ssh_user = 'aviasales'
    const ssh_host = 'ltl1.int.avs.io'
    const pg_dump_path = '/usr/pgsql-9.3/bin/pg_dump'
    shell.exec(`ssh ${ssh_user}@${ssh_host} ${pg_dump_path} ${production} -t \"${dbDev.prefix}texts*\" -F t > ${dumpfile}`)

    const dev = dbDev.name
    shell.exec(`pg_restore --verbose --clean --no-acl --no-owner -d ${dev} ${dumpfile}`)
})

gulp.task('build', () => (runSequence('others', 'fonts', 'svg', 'css', 'scripts', 'images')))
gulp.task('watch', () => {

    runSequence('nodemon', 'server:start', 'webpack:server')

    watch(stylSource, () => (runSequence('css:create', 'server:update')))
    watch([...jsSource, '!client/js/admin{,/**}', '!client/js/app{,/**}'], () => runSequence('scripts', 'server:reload'))
    watch(imagesSource, () => runSequence('images'))
    watch(svgSource, () => runSequence('svg:optimize'))
    watch(svgSpriteSource, { cwd: dir }, () => runSequence('svg:sprite', 'webpack:server'))
    watch(fontsSource, () => runSequence('fonts'))
    watch(othersSource, () => runSequence('others'))
    watch([othersSource, htmlSource], () => runSequence('server:reload'))

})
