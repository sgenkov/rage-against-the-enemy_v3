const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge').default;
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    entry: [
        "@babel/polyfill",
        path.resolve(__dirname, '../src/index.js')
    ],
    optimization: {
        minimize: true
    },
    plugins: [
    ]
});
