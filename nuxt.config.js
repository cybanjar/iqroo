export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "iqroo",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [
      {
        src: "https://kit.fontawesome.com/163ae98d1f.js",
        async: true,
        crossorigin: "anonymous",
      },
    ],
  },
  loading: "@/components/Loading.vue",
  proxy: {
    "/api": {
      target: process.env.API_QURAN,
      pathRewrite: { "^/api": "/" },
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/scss/app.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "@/plugins/overlay", ssr: false },
    { src: "@/plugins/hello", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "cookie-universal-nuxt",
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyD-QJExxf2SdaJKHBASQ-_oXYlninJDhrE',
          authDomain: 'tes-db-vue-2.firebaseapp.com',
          projectId: 'tes-db-vue-2',
          storageBucket: 'tes-db-vue-2.appspot.com',
          messagingSenderId: '920167290244',
          appId: '1:920167290244:web:b3eea1af9359a0843639d1',
          measurementId: '<measurementId>'
        },
        services: {
          auth: true,
          database: true,
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { browserBaseURL: "/api", proxy: true },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require("sass"),
      },
      scss: {
        implementation: require("sass"),
      },
    },
  },
  server: {
    port: 8000 // default: 3000
  }
};
