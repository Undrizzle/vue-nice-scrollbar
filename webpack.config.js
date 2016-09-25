var path = require('path');

module .exports = {
    entry: {
        'vue-nice-scrollbar': path.join(__dirname, 'src/vue-nice-scrollbar.vue')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        library: 'VueNiceScrollbar',
        libraryTarget: 'umd',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/},
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.less$/, loader: "style!css!less"}
        ]
    },
    babel: {
        "presets": ["es2015"]
    },
    plugins: []
};
