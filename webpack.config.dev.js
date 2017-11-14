const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const paths = require('./paths');
const babelConfig = require('./babel.dev');

module.exports = {
  context: __dirname + '/src',
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:9000/',
    'webpack/hot/only-dev-server',
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
        exclude: /node_modules/,
        loaders: ['react-hot'],
        include: paths.appContext,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        include: paths.appContext,
        loader: 'babel',
        query: babelConfig,
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass!postcss',
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader?limit=10000&name=fonts/[name].[ext]',
      },
      {
        test: /\.(jpg|png|gif|ico)(\?.*)?$/,
        loader: 'file',
        query: {
          name: 'media/[name].[ext]',
        },
      },
    ],
  },

  // We use PostCSS for autoprefixing only.
  postcss() {
    return [autoprefixer];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    hot: true,
    contentBase: './src',
    noInfo: true,
  },
};
