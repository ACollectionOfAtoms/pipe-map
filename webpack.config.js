var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './src/app.js',
  output: {
    path: './static',
    publicPath: '/static/',
    filename: 'build.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      d3: 'd3'
    })
  ],
  module: {
    // avoid webpack trying to shim process
    noParse: /es6-promise\.js$/,
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        // excluding some local linked packages.
        // for normal use cases only node_modules is needed.
        exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        loader: 'babel'
      }
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  resolve: {
    root: [
      path.resolve('./src/')
    ],
    alias: {
      'vue$': 'vue/dist/vue.js'
    }
  }
}

// if (process.env.NODE_ENV === 'production') {
//   module.exports.plugins = [
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.optimize.OccurenceOrderPlugin()
//   ]
// } else {
//   module.exports.devtool = '#source-map'
// }
