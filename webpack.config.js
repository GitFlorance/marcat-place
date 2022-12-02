const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssNested = require('postcss-nested');
const postcssImport = require('postcss-import');

module.exports = {
    mode: 'development',
    entry: {
        app: './src/script',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src/script'),
            },
            {
                test: /\.(css|pcss)$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [postcssNested,postcssImport],
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                    },
                }],
            },
            {
                test: /\.(jpg|png)$/,
                include: path.resolve(__dirname, 'src/image'),
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'image'
                    },
                }],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.scss', '.png', 'jpg'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },

    devServer: {
        compress: true,
        historyApiFallback: true,
        port: 3000,
        hot: "only",
        static: {
            directory: './dist',
        },
        client: {
            overlay: true,
        }
    },

    plugins: [
        new CleanWebpackPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
        }),
        new HtmlWebpackPlugin({template: './src/pages/index.html'}),
    ],

    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[id].chunk.js'
    },
};