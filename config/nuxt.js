const pkg = require('../package')
const resolve = require('path').resolve

module.exports = {
  mode: 'spa',

  srcDir: resolve(__dirname, '..', 'resources'),

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
    loading: {
        color: '#4688ff',
        height: '3px'
    },

  /*
  ** Global CSS
  */
  css: [
    '~assets/css/main.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      '~/plugins/axios',
      '~/plugins/bootstrap',
      '~/plugins/font-awesome',
      '~/plugins/main',
     // { src: '~/plugins/nuxt-client-init.js', ssr: false }
    ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
      // fontawesome
      // 'qonfucius-nuxt-fontawesome',
      // With options
      // ['qonfucius-nuxt-fontawesome',{ componentName: 'fa-icon', packs: [] }],
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
     prefix: '/api',
    proxy: true,
    credentials: true,
    retry: { retries: 3 }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
