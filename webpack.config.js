const path = require('path')

module.exports = {
  mode: 'production',
  entry: './js/index.js',
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js'
  },
  module: {
      rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }
}
