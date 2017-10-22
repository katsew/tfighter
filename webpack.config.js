const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const webpack = require("webpack");

const ASSET_PATH = process.env.ASSET_PATH || "/";
module.exports = {
    entry: "./src/assets/js/index.js",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist"
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.ejs",
            title: "Output Management"
        }),
        new CleanWebpackPlugin("dist", {
            exclude: [".gitkeep"]
        }),
        new CopyWebpackPlugin([
            {
                context: "src/assets/img",
                from: "**/*",
                to: "assets/img"
            }
        ]),
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
        })
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: ASSET_PATH
    }
}