import webpack from 'webpack'
import config, { dir } from 'config'

import responsiveValues from '../gulp/postcss-responsive-with-coefficients'

const webpackConfig = {
    debug: true,
    entry: {
        admin: [
            'webpack-dev-server/client?http://127.0.0.1:8085', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            `${config.dir}/client/js/admin/index.js`,
        ],
        app: [
            'babel-polyfill',
            'webpack-dev-server/client?http://127.0.0.1:8085', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            `${config.dir}/client/js/app/index.js`
        ]
    },
    output: {
        path: `${config.dir}/public/js/`,
        publicPath: '/layout/js/',
        filename: '[name].js',
        pathinfo: true
    },
    //devtool: 'cheap-source-map',
    module: {
        noParse: [/moment.js/],
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader/webpack', 'babel-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-raw-loader']
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
            responsiveValues()
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
        new webpack.DefinePlugin({
            'process.env': {
                REBEM_MOD_DELIM: JSON.stringify('--'),
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}

export default webpackConfig
