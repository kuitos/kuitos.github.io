/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-06
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({filename: '/build/assets.json', prettyPrint: true, update: true});

module.exports = {
  devtool: 'source-map',
  entry  : {
    app: './src/app/app'
  },
  output : {
    path         : path.join(__dirname, 'build'),
    publicPath   : '/build/',
    filename     : '[name]-[hash:8].js',
    chunkFilename: '[id].chunk-[chunkhash:8].js'
  },
  plugins: [
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
  module : {
    preLoaders: [
      {
        test   : /\.jsx?$/,
        loader : 'eslint-loader',
        exclude: /(node_modules|src\/app\/containers)/,
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
        test   : /\.css$/,
        loader : ExtractTextPlugin.extract('style', 'css'),
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'node_modules/normalize.css')]
      },
      {
        test   : /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
    ]
  }
};
