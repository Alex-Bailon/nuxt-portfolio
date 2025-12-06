// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  
  app: {
    head: {
      title: 'Alex Bailon | Full Stack Developer',
      titleTemplate: '%s | Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Senior Full Stack Developer and Technical Team Lead specializing in Vue.js/Nuxt and React ecosystems. Building scalable solutions and leading high-performing teams.' 
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#9333ea' }
      ],
      link: [
        { 
          rel: 'icon', 
          href: "/logo.png" 
        }
      ]
    }
  }
})