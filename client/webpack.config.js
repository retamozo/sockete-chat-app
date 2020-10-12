const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            { test: /\.ts(x?)$/, exclude: /node_modules/, loader: "ts-loader" },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.html/,
                exclude: /node_modules/,
                use: ['html-loader']
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json", ".tsx", ".ts"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html')
        }),

    ],
    devtool: "source-map",
    cache: true,
    devServer: {
        publicPath: "./",
        contentBase: path.join(__dirname, './dist'),
        hot: true,
        port: 8080,
    }
};
