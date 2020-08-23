
const HTMLWebpackPlugin = require('html-webpack-plugin')

const WebpackConfig = {
    entry: "./src/js/index.js",
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/html/index.html",
            filename: "index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
};

module.exports = WebpackConfig;
