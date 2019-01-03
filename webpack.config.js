require("dotenv").config();
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");



var configFunc = function(){
    var config = {
        devtool: "source-map",
        entry: [
            'webpack-hot-middleware/client?reload=true',
            __dirname + "/src/app.js"
        ],
        output: {
            path: __dirname + "/dist",
            filename: "bundle.js",
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: "babel-loader",
                    exclude: [/node_modules/]
                },
                {
                    test: /\.(sass|scss|css)$/,
                    use: [
                        {
                            loader: "style-loader" // creates style nodes from JS strings
                        },
                        {
                            loader: "css-loader" // translates CSS into CommonJS
                        }
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                hash: true,
                template: path.join(__dirname , "/public/index.html"),
                inject: "body"
            }),
            new webpack.DefinePlugin({
              REACT_APP_API_KEY: JSON.stringify("development"),
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.BannerPlugin("React Twilio"),
            new ExtractTextPlugin("[name]-[hash].css")
        ]};
    if(process.env.NODE_ENV === "production") {
        config.plugins.push(new webpack.optimize.UglifyJsPlugin());
        config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
            name: "commons",
            filename: "commons.js"
        }));
    }
    return config;
}();

module.exports = configFunc;
