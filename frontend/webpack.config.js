const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'source-map', // Updated to a valid pattern for Webpack 5
    cache: true,
    mode: 'development',
    resolve: {
        alias: {
            'stompjs': path.resolve(__dirname, 'node_modules', 'stompjs/lib/stomp.js'),
        }
    },
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static/built'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/main/resources/templates/index.html',
            filename: 'index.html'
        })
    ]
};
