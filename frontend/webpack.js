const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'eslint-loader',
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader', // compiles Sass to CSS, using Node Sass by default
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]',
            },
            {
                test: /\.(ico)$/,
                use: 'file-loader?name=assets/[name].[ext]',
            },
        ],
    },
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new Dotenv()
    ],
    node: {
        fs: 'empty',
    },
    devServer: {
        contentBase: path.join(__dirname, './public'),
        publicPath: '/',
        historyApiFallback: true,
        compress: true,
        overlay: true,
        quiet: false,
        open: true,
        proxy: {
            context: ['/uploads/**', '/api/**'],
            target: 'http://localhost:5000',
            secure: false,
            changeOrigin: true
        }
    },
    performance: false,
};