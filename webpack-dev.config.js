/**
 * @author Kuitos
 * @homepage https://github.com/kuitos/
 * @since 2015-08-06
 */
var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',
  entry  : [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './src/app/App.jsx'
  ],
  output : {
    path             : path.join(__dirname, 'build'),
    filename         : 'bundle.js',
    publicPath       : 'http://localhost:3000/build/' // hot loader publish dir
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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
        include: path.join(__dirname, 'src')
      },
      {
        test   : /\.css$/,
        loaders: ['style', 'css', 'postcss']
      },
      {
        test   : /\.scss$/,
        loaders: ['style', 'css', 'sass', 'postcss']
      }

    ]
  }
};
