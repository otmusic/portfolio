const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


let mode = "development";
let target = 'web';

if (process.env.NODE_ENV === "production") {
    mode = "production";
    target = 'browserslist';
}

const plugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html', // Данный html будет использован как шаблон
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
    }),
];

if (process.env.SERVE) {
    plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
    mode,
    target,
    entry: './src/index.jsx',
    output: { filename: 'main.js',path: path.resolve(__dirname, 'dist'),clean: true },
    devtool: 'source-map',
    devServer: {
        hot: true,
    },
    module: {
        rules: [
            { test: /\.svg$/, type: 'asset', use: 'svgo-loader' },
            { test: /\.(html)$/, use: ['html-loader'] },
            { test: /\.(s[ac]|c)ss$/i, use: [MiniCssExtractPlugin.loader,'css-loader','postcss-loader','sass-loader'] },
            { test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,type: mode === 'production' ? 'asset' : 'asset/resource' },
            { test: /\.(woff2?|eot|ttf|otf)$/i,type: 'asset/resource' },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    }
                }
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    plugins
};
