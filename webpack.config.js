const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = merge(require('./webpack.base'), {
    context: __dirname,

    entry: {
        'index': './src/index.js',
        'index.min': './src/index.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: 'vue-forms',
        libraryTarget: 'umd',
    },

    externals: [
        "bootstrap-daterangepicker",
        "bootstrap-sass",
        "bootstrap-select",
        "dropzone",
        "eonasdan-bootstrap-datetimepicker",
        "fontawesome",
        "jquery",
        "jquery-mask-plugin",
        "lodash",
        "moment",
        "vue"
    ],

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
        }),
    ],
});
