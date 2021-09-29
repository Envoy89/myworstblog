const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve(__dirname, 'src/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    watch: !NODE_ENV || NODE_ENV && NODE_ENV == 'development',
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000,
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                exclude: /node_modules/,
                use: ['ts-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new CopyWebpackPlugin({ 
            patterns: [ 
                { from: path.resolve(__dirname, 'public/css'), to: path.resolve(__dirname, 'dist/css') } 
            ]
        })
    ],
    devServer: {
        contentBase: path.resolve('public'),
        port: 3001,
        open: true,
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:3000'
        },
    },
    devtool: 'source-map',
}