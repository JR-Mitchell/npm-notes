
const HTMLWebpackPlugin = require('html-webpack-plugin')

const WebpackConfig = {
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html",
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
