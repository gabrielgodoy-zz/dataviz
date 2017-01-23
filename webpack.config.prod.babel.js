import 'babel-polyfill';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

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
        loader: ExtractTextPlugin.extract(
          'style-loader', 'css-loader?modules!postcss-loader!stylus-loader'),
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader', 'css-loader'),
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
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
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
  },
  postcss() {
    return [autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9'],
      remove: false,
    })];
  },
  plugins: [
    // Optimizes the order that the files are bundled
    new webpack.optimize.OccurenceOrderPlugin(),

    new ExtractTextPlugin('main.css'),
    // Eliminates duplicated packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    // Uglify bundle
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
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
