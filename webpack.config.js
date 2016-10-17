const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: {
        index: './public/js/app.js',
        login: './public/js/login.js',
    },
    output: {
        path: path.join(__dirname, 'public/build/'),
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react'],
                plugins: ['transform-decorators-legacy'],
            }
        }, {
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    }
};
