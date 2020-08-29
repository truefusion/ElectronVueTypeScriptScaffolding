// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#web-workers
const WorkerPlugin = require('worker-plugin')

module.exports = {
  // options...
  publicPath: '',
  pluginOptions: {
    electronBuilder: {
      // Prevent bundling of certain imported packages and instead retrieve these external dependencies at runtime.
      // In order to connect to websocket.
      externals: ['ggc'],
      builderOptions: {
        productName: 'GGC',
        win: {
          icon: './public/app.ico'
        },
        mac: {
          icon: './public/icons/Icon.icns',
          target: [
            'pkg',
            'dmg',
            'zip',
          ],
        },
        linux: {
          icon: './public/app.png'
        }
      },
      // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#webpack-configuration
      chainWebpackRendererProcess: (config) => {
        // Chain webpack config for electron renderer process only
        // The following example will set IS_ELECTRON to true in your app
        config.plugin('define').tap((args) => {
          args[0]['IS_ELECTRON'] = true
          return args
        })
      },
      mainProcessFile: 'src/background.ts',
      // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#typescript-options
      disableMainProcessTypescript: false, // Manually disable typescript plugin for main process. Enable if you want to use regular js for the main process (src/background.js by default)
      mainProcessTypeChecking: false, // Manually enable type checking during webpck bundling for background file.
      // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#preload-files
      preload: 'src/preload.js',
      // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration
      nodeIntegration: true
    },
    // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#web-workers
    configureWebpack: {
      plugins: [new WorkerPlugin()]
    }
  }
}
