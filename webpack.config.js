module.exports = {
  context: __dirname + '/src',

  entry: [
    "whatwg-fetch", "./main.js"
  ],

  output: {
    path: __dirname + '/static',
    filename: "client.js"
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
  }
}
