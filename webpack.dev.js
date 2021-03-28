const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        writeToDisk: true,
        injectClient: false
        },
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        // new BundleAnalyzerPlugin({
        //     analyzerMode: "json",
        //     analyzerHost: "127.0.0.1",
        //     analyzerPort: "auto",
        //     defaultSizes:"parsed",
        //     openAnalyzer: "true",
        //     generateStatsFile: "false",
        //     statsFilename: "stats.json",
        //     statsOptions:"null"
        // })
    ]
}
