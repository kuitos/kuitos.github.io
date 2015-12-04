/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-06
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({filename: '/build/assets.json', prettyPrint: true, update: true});
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry  : {
    app: './src/app/App.jsx'
  },
  output : {
    path             : path.join(__dirname, 'build'),
    publicPath       : 'build/',
    filename         : '[name]-[hash:8].js'
  },
  plugins: [
    new CleanPlugin('build'),
    new ExtractTextPlugin('[name]-[contenthash:8].css'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.NoErrorsPlugin(),
    assetsPluginInstance
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  eslint : {
    configFile : '.eslintrc',
    emitWarning: true,
    emitError  : true,
    formatter  : require('eslint-friendly-formatter')
  },
  postcss: [autoprefixer({browsers: ['last 2 versions']})],
  module : {
    preLoaders: [
      {
        test   : /\.jsx?$/,
        loader : 'eslint-loader',
        exclude: /(node_modules|src\/app\/containers)|(src\/app\/App\.jsx)/,
        include: path.join(__dirname, 'src')
      }
    ],

    loaders: [
      {
        test   : /\.jsx?$/,
        loaders: ['babel'],
        exclude: /(node_modules|bower_components)/,
        include: [path.join(__dirname, 'src')]
      },
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      },
      {
        test  : /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass!postcss')
      }
    ]
  }
};
