import webpack from 'webpack'
import config from 'config'
import autoprefixer from 'autoprefixer'

const webpackConfig = {
    entry: {
        admin: [
            'webpack-dev-server/client?http://127.0.0.1:8080', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            `${config.dir}/client/js/admin/index.js`,
        ],
        index: `${config.dir}/client/js/index.js`,
    },
    output: {
        path: `${config.dir}/public/js/`,
        publicPath: '/layout/js/',
        filename: '[name].js',
        pathinfo: true
    },
    devtool: 'cheap-source-map',
    module: {
        noParse: [/moment.js/],
        loaders: [
            {
                test: /(\.js|\.jsx)$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-raw-loader']
            },
            {
                test: /\.styl$/,
                loaders: ['style-loader', 'css-raw-loader', 'postcss', 'stylus-loader']
            },
            {
                test: require.resolve('snapsvg'),
                loader: 'imports-loader?this=>window,fix=>module.exports=0'
            }
        ]
    },
    postcss() {
        return [autoprefixer(({ browsers: 'last 4 version' }))]
    },
    stylus: {
        use: [require('nib')()]
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
}

export default webpackConfig
