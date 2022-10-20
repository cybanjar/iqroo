import dotenv from 'dotenv'

const path
  = process.env.NODE_ENV === 'production'
    ? '.env'
    : `.env.${process.env.NODE_ENV}`

dotenv.config({ path })

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title    : 'iqroo',
    htmlAttrs: { lang: 'en' },
    meta     : [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid    : 'description', name   : 'description', content: '',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel : 'icon', type: 'image/x-icon', href: '/favicon.ico',
      },
      {
        href: 'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap',
        rel : 'stylesheet',
      },
    ],
    script: [
      {
        src        : 'https://kit.fontawesome.com/163ae98d1f.js',
        async      : true,
        crossorigin: 'anonymous',
      },
    ],
  },
  loading: '@/components/Loading.vue',
  proxy  : {
    '/api/hadits': {
      target     : process.env.API_HADIST,
      pathRewrite: { '^/api/hadits': '/' },
    },
    '/api': {
      target     : process.env.API_QURAN,
      pathRewrite: { '^/api': '/' },
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '@/plugins/overlay', ssr: false }, { src: '@/plugins/hello', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey           : process.env.FIREBASE_API_KEY,
          authDomain       : process.env.FIREBASE_AUTH_DOMAIN,
          projectId        : process.env.FIREBASE_PROJECT_ID,
          storageBucket    : process.env.FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.FIREBASE_MESS_SENDER_ID,
          appId            : process.env.FIREBASE_APP_ID,
          measurementId    : '<measurementId>',
        },
        services: {
          auth    : true,
          database: true,
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { browserBaseURL: '/api', proxy: true },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: { implementation: require('sass') },
      scss: { implementation: require('sass') },
    },
    babel: { compact: true },
  },
  server: { port: 8000 },
}
