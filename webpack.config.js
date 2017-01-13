const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    index: './public/js/app.js',
    login: './public/js/login.js',
    team: './public/js/team.js',
  },
  output: {
    path: path.join(__dirname, 'public/build/'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "public"),
        ],
        query: {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: ['transform-runtime', 'transform-decorators-legacy']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};
