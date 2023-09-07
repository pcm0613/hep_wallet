const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/popup.js',
  output: {
    filename: 'popup.bundle.js',
    path: path.resolve(__dirname, 'public/popup')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    }
    ]
  }
};
