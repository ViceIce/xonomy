const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
                query: {
                  declaration: false,
                }
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                use: ['file-loader', 'image-webpack-loader?bypassOnDebug'],
                include: path.resolve(__dirname, 'assets/img')
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin('styles.css')
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Xonomy',
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
};
