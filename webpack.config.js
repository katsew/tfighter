const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/assets/js/index.js",
    devServer: {
        contentBase: "./dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.ejs",
            title: "Output Management"
        }),
        new CleanWebpackPlugin("dist", {
            exclude: [".gitkeep"]
        })
    ],
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
}