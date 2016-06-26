import gulp from 'gulp'
import config from 'config'
import runSequence from 'run-sequence'

import webpack from 'webpack'
import webpackStream from 'webpack-stream'
import WebpackDevServer from 'webpack-dev-server'

import nib from 'nib'

//PostCSS
import mqpacker from 'css-mqpacker'
import base64 from 'postcss-inline-base64'
import cssnano from 'cssnano'
import svg2png from 'gulp-svg2png'
import inlineimg from 'gulp-inline-image-html'
import rupture from 'rupture'

const browserSync = require('browser-sync').create()
const { folders: { dist: dist } } = config
const { nodemon, postcss, stylus, plumber, notify, svgmin, tinypng, svgstore, rename } = require('gulp-load-plugins')()

const jsSource = ['client/js/**/*.js']
const imagesSource = ['client/images/**/*.jpg', 'client/images/**/*.gif', 'client/images/**/*.png']
const othersSource = 'client/others/**/*.*'
const fontsSource = 'client/fonts/**/*.*'
const htmlSource = 'client/templates/**/*.pug'
const svgSpriteSource = 'client/images/svg/sprite/*.svg'
const svgSource = ['client/images/svg/**/*.svg', `!${svgSpriteSource}`]

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
    .pipe(svgmin(svgMinConfig))
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
    gulp.src(imagesSource)
    .pipe(gulp.dest(`${dist}/images/`))
))

gulp.task('images:tinypng', () => (
    gulp.src(imagesSource[2])
    .pipe(tinypng(config.tinypng))
    .pipe(gulp.dest(`${dist}/images/`))
))

gulp.task('images:svg2png', () => {
    gulp.src('./client/images/svg/png/*.svg')
    .pipe(svg2png(4))
    .pipe(tinypng(config.tinypng))
    .pipe(gulp.dest(`${dist}/images/svg2png`))
})

gulp.task('images:generate_html_base64', () => {
    gulp.src('client/templates/images.html')
    .pipe(inlineimg(`${dist}/images/svg2png`))  // takes in the directory to use as the root when looking for images
    .pipe(gulp.dest(`${dist}/html`))
})

gulp.task('css:create', () => (
    gulp.src('client/css/style.styl')
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(stylus({ use: stylusFunctions, cache: false }))
    .pipe(postcss([base64({ baseDir: `${dist}/css/` }), mqpacker({ sort: true })]))
    .pipe(gulp.dest(`${dist}/css/`))
))

gulp.task('css:min', () => (
    gulp.src(`${dist}/css/**/*.css`)
    .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest(`${dist}/css/`))
))

gulp.task('webpack:server', () => {
    const server = new WebpackDevServer(webpack(require(`../webpack/${NODE_ENV}.js`)),
        {
            proxy: {
                '**': 'http://localhost:3000'
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
    server.listen(8001)
})

gulp.task('scripts', () => (
    gulp.src('client/js/index.js')
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

console.log([...jsSource, '!client/js/admin/**/*.js'])

gulp.task('build', () => (runSequence('others', 'fonts', 'svg', 'css', 'scripts')))
gulp.task('watch', () => {

    runSequence('nodemon', 'server:start', 'webpack:server')

    gulp.watch('client/css/**/*.styl', () => (runSequence('css:create', 'server:update')))
    gulp.watch([...jsSource, '!client/js/admin{,/**}'], () => runSequence('scripts', 'server:reload'))
    gulp.watch(imagesSource, () => runSequence('images'))
    gulp.watch(svgSource, () => runSequence('svg:optimize'))
    gulp.watch(svgSpriteSource, () => runSequence('svg:sprite'))
    gulp.watch(fontsSource, () => runSequence('fonts'))
    gulp.watch(othersSource, () => runSequence('others'))
    gulp.watch([othersSource, htmlSource], () => runSequence('server:reload'))

})
