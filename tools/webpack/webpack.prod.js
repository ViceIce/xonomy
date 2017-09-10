const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true,
            include: /\.min\.js$/,
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    externals: {
        jquery: {
            commonjs: 'jquery',
            commonjs2: 'jquery',
            amd: 'jquery',
            root: '_'
        }
    },
    entry:{
        'index.umd': './src/index.ts',
        'index.umd.min': './src/index.ts'
    }
});
