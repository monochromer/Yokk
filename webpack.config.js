var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './public/js/app.js',
    login: './public/js/login.js'
    },
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy']
        }
      }
    ]
  },
  watch: true
}
