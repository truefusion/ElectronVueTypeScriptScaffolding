module.exports = {
  entry: './src/background.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'background.js'
  }
}
