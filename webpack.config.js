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
        "@tinymce/tinymce-vue",
        "bootstrap-sass",
        "bootstrap-daterangepicker",
        "bootstrap-select",
        "dropzone",
        "fontawesome",
        "jquery",
        "lodash",
        "moment",
        "simplemde",
        "vue",
        "vue-the-mask"
    ],

    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true,
        }),
    ],
});
