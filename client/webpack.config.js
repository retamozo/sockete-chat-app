const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const yaml = require('js-yaml')
const fs = require("fs");

const globalStyles = [
    // /node_modules/,
    // path.resolve(__dirname, "node_modules"),
    path.resolve(__dirname, "src/lib"),
];


//TODO split configs by local, dev and prod envs.
const configFile = path.resolve(__dirname, `config.local.yml`);

const appConfig = yaml.safeLoad(fs.readFileSync(configFile, "utf8"));
const srcPath = path.resolve(__dirname, "src");
// should merge of local, dev and stage. Implement with Teller APP in asap 
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                include: globalStyles,
                options: {
                    url: true,
                    modules: true,
                    sourceMap: true
                },
                loader: "css-loader",
            },
            { test: /\.ts(x?)$/, exclude: /node_modules/, loader: "ts-loader" },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.html/,
                exclude: /node_modules/,
                use: ["html-loader"],
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader",
            },
        ],
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".json", ".tsx", ".ts"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "./src/index.html"),
        }),
    ],
    devtool: "source-map",
    cache: true,
    devServer: {
        publicPath: "./",
        contentBase: path.join(__dirname, "./dist"),
        hot: true,
        port: 8080,
    },
    externals: {
        APP_CONFIG: JSON.stringify(appConfig),
    }
};
