module.exports = {
  entry: './src/background.ts',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'background.js'
  },
  // https://github.com/GoogleChromeLabs/worker-plugin
  plugins: [
    new WorkerPlugin()
  ],
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  })
}
