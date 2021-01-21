const path = require('path');

module.exports = {
    output: {
        path: path.join(__dirname, '../public'),
        filename: 'bundle.js'
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, '..', 'src'),
        ],
        extensions: ['.js', '.css'],
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },

        ]
    }
};
