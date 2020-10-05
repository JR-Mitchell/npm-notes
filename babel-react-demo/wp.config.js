
const HTMLWebpackPlugin = require('html-webpack-plugin');
var path = require("path");

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
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname,"src"), "node_modules"],
        extensions: ['.js', '.jsx']
    }
};

module.exports = WebpackConfig;
