import 'babel-polyfill';
import autoprefixer from 'autoprefixer';

let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/assets/js/main.js'],
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader?sourceMap!postcss-loader!stylus-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.html$/,
        loader: 'file-loader',
      },
      {
        test: /\.(eot|otf|woff|woff2|ttf|svg)$/,
        loader: 'url-loader?limit=30000&name=[name].[ext]',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader?name=[path][name].[ext]',
      },
    ],
  },
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: path.resolve('/'),
  },
  postcss() {
    return [autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9'],
      remove: false,
    })];
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dataviz',
      filename: 'index.html',
      template: './src/index.pug',
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.styl', '.pug'],
  },
};
