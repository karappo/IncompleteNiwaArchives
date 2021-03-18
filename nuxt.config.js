export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'niwa-archive-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '終わらない庭のアーカイブ - Incomplete Niwa Archives' },
      { hid: 'og:site_name', property: 'og:site_name', content: '終わらない庭のアーカイブ - Incomplete Niwa Archives' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://niwa.ycam.jp/' },
      { hid: 'og:title', property: 'og:title', content: '終わらない庭のアーカイブ - Incomplete Niwa Archives' },
      { hid: 'og:description', property: 'og:description', content: '終わらない庭のアーカイブ - Incomplete Niwa Archives' },
      { hid: 'og:image', property: 'og:image', content: 'https://special.ycam.jp/niwa/TODO.png' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      { src: "//webfont.fontplus.jp/accessor/script/fontplus.js?Kda7jDZHaBw%3D&box=A7D-74mRhRo%3D&aa=1&ab=2", defer: true},
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['~assets/style/common'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [
      'three'
    ]
  },

  generate: {
    routes: [
      '/murin-an-0.1/',
      '/murin-an-0.05/',
      '/murin-an-0.02/',
      '/sessyu-tei-0.1/',
      '/sessyu-tei-0.05/',
      '/sessyu-tei-0.02/'
    ]
  }
}
