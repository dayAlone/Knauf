import webpack from 'webpack'
import config, { dir } from 'config'

import responsiveValues from '../gulp/postcss-responsive-with-coefficients'

import CompressionPlugin from 'compression-webpack-plugin'

// PostCSS plugins
import autoprefixer from 'autoprefixer'
import mqpacker from 'css-mqpacker'
import csso from 'postcss-csso'
import base64 from 'postcss-inline-base64'

export default {
    entry: {
        admin: `${config.dir}/client/js/admin/index.js`,
        app: [
            'babel-polyfill',
            `${config.dir}/client/js/app/index.js`
        ],
    },
    output: {
        path: `${config.dir}/public/js/`,
        publicPath: '/layout/js/',
        filename: '[name].js',
        pathinfo: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-raw-loader', 'postcss']
            },
            {
                test: /\.styl$/,
                loaders: ['style-loader', 'css-loader', 'postcss', 'stylus-loader']
            },
            {
                test: /\.svg$/,
                loader: 'raw-loader'
            }
        ]
    },
    postcss() {
        return [
            responsiveValues(),
            autoprefixer(({ browsers: 'last 4 version' })),
            mqpacker({ sort: true }),
            csso,
            base64({ baseDir: `${config.dist}/css/` })
        ]
    },
    stylus: {
        use: [
            require('nib')(),
            require('rupture')()
        ],
        import: [
            '~nib/lib/nib/index.styl',
            `${dir}/client/css/include/mixins.styl`,
            `${dir}/client/css/include/colors.styl`,
            `${dir}/client/css/include/fonts.styl`
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.ProvidePlugin({}),
        new CompressionPlugin({
            asset: '[file].gz',
            algorithm: 'gzip',
            regExp: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            minimize: true,
            comments: false,
            compress: {
                drop_debugger: true,
                warnings: false,
                drop_console: true
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                REBEM_MOD_DELIM: JSON.stringify('--'),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}
