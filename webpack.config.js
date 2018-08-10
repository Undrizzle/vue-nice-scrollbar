var path = require('path')
var webpack = require('webpack')

module .exports = {
    entry: {
        'vue-nice-scrollbar': path.join(__dirname, 'src/main')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: "build.js"
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    resolve: {
        alias: {vue: 'vue/dist/vue.js'}
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.css$/, loader: "style!css"}
        ]
    },
    babel: {
        "presets": ["es2015"]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}

