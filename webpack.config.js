var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var isProduction = process.env.NODE_ENV === 'production';

function extractForProduction(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

var localIdentName = isProduction ? '[hash:base64]' : '[path]-[local]-[hash:base64:5]';
var cssLoaders = 'style!css?localIdentName=' + localIdentName + '!autoprefixer?browsers=last 2 versions';
var lessLoaders = cssLoaders + '!less';

if (isProduction) {
  cssLoaders = extractForProduction(cssLoaders);
  lessLoaders = extractForProduction(lessLoaders);
}

module.exports = {

  entry: './src/app.js',

  output: {
    path: require('path').resolve(__dirname, 'dist'),
    pathinfo: isProduction ? false : true,
    filename: 'bundle.js'
  },

  devtool: 'source-map',
  debug: isProduction ? false : true,

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-0']
      }
    }, {
      test: /\.less$/,
      loader: lessLoaders
    }, {
      test: /\.css$/,
      loader: cssLoaders
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader?limit=10000',
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.less'],
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: isProduction ? false: true
    }),
    new HtmlWebpackPlugin({
      template: './src/templates/index.html',
      production: isProduction
    })
  ]
  .concat(isProduction ? [
    new ExtractTextPlugin('styles/[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ] : [])

};
