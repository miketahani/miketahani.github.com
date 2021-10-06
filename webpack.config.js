const path = require('path')

module.exports = {
  mode: 'production',
  entry: './js/index.js',
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js'
  }
}
