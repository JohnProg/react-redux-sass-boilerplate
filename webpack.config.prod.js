const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const paths = require('./paths');
const babelConfig = require('./babel.prod');

module.exports = {
  context: __dirname + '/src',
  bail: true,
  devtool: 'source-map',
  entry: [
    paths.appIndexJs,
  ],
  output: {
    path: paths.appDist,
    filename: 'js/main.min.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.scss'],
    alias: {
      'babel-runtime/regenerator': require.resolve('babel-runtime/regenerator'),
    },
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        include: paths.appContext,
        loader: 'babel',
        query: babelConfig,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style',
          'css?-autoprefixer!sass!postcss'),
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  // We use PostCSS for autoprefixing only.
  postcss() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
      }),
    ];
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
    // This helps ensure the dists are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        comments: false,
        screw_ie8: true,
      },
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin('css/main.min.css'),
  ],
};
