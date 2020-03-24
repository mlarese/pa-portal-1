const nodeExternals = require('webpack-node-externals')
// const resolve = (dir) => require('path').join(__dirname, dir)

console.clear()
console.log('-------', process.env.NODE_ENV)
let routerBase = '/'
if (process.env.NODE_ENV === 'production') {
  routerBase = '/maingest/'
}

module.exports = {
  'mode': 'spa',
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  _auth: {
    redirect_: {
      logout: '/login',
      callback: '/callback'
    },
    resetOnError: true
  },
  router: {
    mode: 'hash',
    base: routerBase,
    middleware: ['acl']
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Procedimenti',
    meta: [

      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'privacy manager' }
    ],
    script: [
      { type: 'text/javascript', src: 'js/globals.js'},
      { type: 'text/javascript', src: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU&libraries=places'}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/mmfavicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat:400,700' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,500,700'}
    ]
  },
  plugins: [
    { src: '~plugins/vue-router-sync', ssr: false },
    '~/plugins/vuetify.js',
    { src: '~plugins/i18n.js', injectAs: 'i18n' }
  ],
  css: [
    '~/assets/style/app.styl',
    '~/assets/element-ui.css',
    '~/assets/main.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: '~/components/General/Loader.vue',
  loading_: {
    color: '#2196f3',
    height: '2px'
  },

  /*
  ** Build configuration
  */
  build: {
    publicPath: '/_nuxt/',
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    vendor: [
      'babel-polyfill',
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }

      config.module.rules.find( el => el.loader === 'vue-loader' ).options.loaders.i18n = '@kazupon/vue-i18n-loader'
      // console.clear()
      // console.log(module.exports.router)

      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    }
  }
}
