const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    './public/js/app.js',
    './public/js/login.js',
    './public/js/team.js'
  ],
  output: {
    path: path.join(__dirname, 'public/build/'),
    filename: '[name].bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",

        // Skip any files outside of your project's `src` directory
        include: [
          path.resolve(__dirname, "public"),
        ],
        // Options to configure babel with
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
