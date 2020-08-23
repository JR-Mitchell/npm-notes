
const HTMLWebpackPlugin = require('html-webpack-plugin')

const WebpackConfig = {
    entry: "./src/js/index.js",
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/html/index.html",
            filename: "index.html"
        })
    ]
};

module.exports = WebpackConfig;
