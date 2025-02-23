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
      { hid: 'og:image', name: 'og:image', property: 'og:image', content: 'https://www.alexbailon.net/AlexBailon.webp' },
      { hid: 'og:url', name: 'og:url', property: 'og:url', content: 'https://www.alexbailon.net/' },
      { hid: 'og:title', name: 'og:title', property: 'og:title', content: 'Alex Bailon | Full Stack Developer' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#FF00FF' }
    ],
    link: [
      { rel: 'icon', href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>" },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vuetify.js', mode: 'client' },
    { src:"~plugins/vue-particles", ssr: false }    
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
    ['@nuxtjs/google-tag-manager', { id: 'GTM-M8NDKS2' }],    
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
      scrollTrigger: true,
      text: true
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
  router: {
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 };
    }
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: false,
    theme: {
      dark: true
    }
  },

  env: {
    WEATHER_DASHBOARD_API_KEY: process.env.WEATHER_DASHBOARD_API_KEY
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
