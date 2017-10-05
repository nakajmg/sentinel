const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

module.exports = {
  context: __dirname + '/src',

  entry: [
    "whatwg-fetch", "./Sentinel.js"
  ],

  output: {
    path: __dirname + '/static',
    filename: "js/Sentinel.js",
    library: 'Sentinel',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: path.resolve('public/test.html'),
      filename: 'test.html',
      chunks: ['client'],
    })
  ]
}
