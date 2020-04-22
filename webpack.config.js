const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'index.bundle.js',
    publicPath: '/'
  },
  plugins: [
    new CopyPlugin([
      { from: 'static', to: '' }
    ]),
    new HtmlWebpackPlugin({
      inject: true
    })
  ],
  devServer: {
    contentBase: 'dist',
    port: 8080,
    compress: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.css$/i,
        use: 'css-loader',
      },
    ],
  }
};