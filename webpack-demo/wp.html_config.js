
const HTMLWebpackPlugin = require('html-webpack-plugin')

const WebpackConfig = {
    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html",
            filename: "index.html"
        })
    ]
};

module.exports = WebpackConfig;
