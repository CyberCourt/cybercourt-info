module.exports = {
  publicPath: './',

  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title= 'CyberCourt'
          return args
        })
  },

  pwa: {
    name: 'CyberCourt',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    // configure the workbox plugin (GenerateSW or InjectManifest)
    workboxPluginMode: 'InjectManifest',

    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/service-worker.js',
      importWorkboxFrom: 'disabled',
      importScripts: 'https://cdn.myun.info/workbox-v4.3.1/workbox-sw.js'
      // ...other Workbox options...
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
