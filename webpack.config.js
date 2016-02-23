var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    js: './js/main.js',
    css: './sass/all.scss'
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        exclude: /node_modules/
      },{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  plugins: [
    new ExtractTextPlugin('css/all.css', {
        allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: 'img', to: 'img' },
      { from: 'vendor', to: 'js/vendor' }
    ])
  ]
};
