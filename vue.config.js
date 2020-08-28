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
      }
    }
  }
}

// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#webpack-configuration
module.exports = {
  configureWebpack: {
    // Configuration applied to all builds
  },
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: (config) => {
        // Chain webpack config for electron main process only
      },
      chainWebpackRendererProcess: (config) => {
        // Chain webpack config for electron renderer process only
        // The following example will set IS_ELECTRON to true in your app
        config.plugin('define').tap((args) => {
          args[0]['IS_ELECTRON'] = true
          return args
        })
      },
      // Use this to change the entrypoint of your app's main process
      mainProcessFile: 'src/background.js',
      // Provide an array of files that, when changed, will recompile the main process and restart Electron
      // Your main process file will be added by default
      //mainProcessWatch: ['src/myFile1', 'src/myFile2'],
      //mainProcessWatch: ['dist_electron/preload.js'],
      // Provide a list of arguments that Electron will be launched with during "electron:serve",
      // which can be accessed from the main process (src/background.js).
      // Note that it is ignored when --debug flag is used with "electron:serve", as you must launch Electron yourself
      // Command line args (excluding --debug, --dashboard, and --headless) are passed to Electron as well
      //mainProcessArgs: ['--arg-name', 'arg-value']
    }
  }
}

// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/configuration.html#typescript-options
module.exports = {
  pluginOptions: {
    electronBuilder: {
      // option: default // description
      disableMainProcessTypescript: false, // Manually disable typescript plugin for main process. Enable if you want to use regular js for the main process (src/background.js by default).
      mainProcessTypeChecking: false // Manually enable type checking during webpck bundling for background file.
    }
  }
}

// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#preload-files
module.exports = {
  pluginOptions: {
    electronBuilder: {
      preload: 'dist_electron/preload.js',
      // Or, for multiple preload files:
      //preload: { preload: 'src/preload.js', otherPreload: 'src/preload2.js' }
    }
  }
}

// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration
module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true
    }
  }
}

// https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/guide.html#web-workers
const WorkerPlugin = require('worker-plugin')

module.exports = {
  configureWebpack: {
    plugins: [new WorkerPlugin()]
  }
}
