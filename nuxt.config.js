import colors from 'vuetify/es5/util/colors'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | Portfolio',
    title: 'Alex Bailon | Full Stack Developer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Alex Bailon is Full Stack Web Developer who graduated from Northwestern University with a Full Stack Coding BootCamp. Alex Bailon has years of professional experience coding full stack applications for clients. Alex strives on always going above and beyond of what is expected. For more information on Alex Bailon please visit his website at https://www.alexbailon.net/' },
      { hid: 'og:description', name: 'og:description', property: 'og:description', content: 'Alex Bailon is Full Stack Web Developer who graduated from Northwestern University with a Full Stack Coding BootCamp. Alex Bailon has years of professional experience coding full stack applications for clients. Alex strives on always going above and beyond of what is expected. For more information on Alex Bailon please visit his website at https://www.alexbailon.net/' },
      { hid: 'og:image', name: 'og:image', property: 'og:image', content: '/AlexBailon.webp' },
      { hid: 'og:url', name: 'og:url', property: 'og:url', content: 'https://www.alexbailon.net/' },
      { hid: 'og:title', name: 'og:title', property: 'og:title', content: 'Alex Bailon | Full State Developer' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuetify.js', mode: 'client' },
    { src:"~plugins/vue-particles", mode: 'client' }    
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-gsap-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  gsap: {
    extraPlugins: {
      scrollTo: true,
      scrollTrigger: true
    },
    extraEases: {
      expoScaleEase: true
    },
  },

  robots: {
    UserAgent: '*',
    Sitemap: `${process.env.NUXT_ENV_BASE_URL}/sitemap.xml`,
  },

  sitemap: {
    hostname: process.env.NUXT_ENV_BASE_URL,
    routes: ['/']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  env: {
    WEATHER_DASHBOARD_API_KEY: process.env.WEATHER_DASHBOARD_API_KEY
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
