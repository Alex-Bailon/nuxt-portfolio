<template>
  <v-app >
    <client-only>
      <vue-particles
        color="#FF00FF"
        :particle-opacity="0.3"
        :particles-number="150"
        shape-type="circle"
        :particle-size="3.7"
        lines-color="#FF00FF"
        :lines-width="2"
        :line-linked="true"
        :line-opacity="0.2"
        :lines-distance="150"
        :move-speed="4"
      />
    </client-only>
    <!-- <div class="cursor"></div> -->
    <v-app-bar fixed style="z-index: 99">
      <NuxtLink to="/" class="text-decoration-none">
        <v-app-bar-title class="cursor-pointer white--text">Alex Bailon</v-app-bar-title>
      </NuxtLink>
      <div class="socialsWrapper">
        <v-btn
          v-for="(social, i) in socials"
          :key="i"
          :color="social.color"
          class="white--text"
          :href="social.link"
          target="_blank"
          :value="social.value"
        >
          <v-icon>{{ icons[social.icon] }}</v-icon>
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <v-container class="pt-8">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
      dark
      style="z-index: 7; opacity: 0.9"
    >
      <span> Alex Bailon &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mdiGithub, mdiLinkedin, mdiCalendarCheckOutline, mdiBriefcaseOutline, mdiSchoolOutline, mdiCrosshairsGps, mdiEmailOutline, mdiPhone } from '@mdi/js'

export default {
  name: 'DefaultLayout',
  data () {
    return {
      icons: {
        mdiGithub,
        mdiLinkedin,
        mdiCalendarCheckOutline,
        mdiBriefcaseOutline,
        mdiSchoolOutline,
        mdiCrosshairsGps,
        mdiEmailOutline,
        mdiPhone
      },
      socials: [
        {
          icon: 'mdiEmailOutline',
          color: '',
          link: 'mailto:abailon949@gmail.com',
          value: 'Email'
        },
        {
          icon: 'mdiPhone',
          color: '',
          link: 'tel:7739493259',
          value: 'Phone'
        },
        {
          icon: 'mdiLinkedin',
          color: 'cyan darken-1',
          link: 'https://www.linkedin.com/in/alex-bailon',
          value: 'Linkedin'
        },
        {
          icon: 'mdiGithub',
          color: 'purple darken-1',
          link: 'https://github.com/Alex-Bailon',
          value: 'Github'
        },
      ],      
    }
  },
}
</script>

<style>
  .gradient {
    /* background-image: linear-gradient(to bottom right, #8b0000 , #00008b  ); */
  }
  .v-main {
    padding: 52px 0px !important;
    z-index: 10;
  }
  #particles-js {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    pointer-events: none;
    z-index: 5;
  }
  @media only screen and (max-width: 460px) {
    .v-main {
      padding-top: 102px !important;
    }
  }
  .v-app-bar-title {
    color: inherit !important;
  }
  
  .v-app-bar a {
    color: inherit;
  }
  
  .v-app-bar a:hover {
    opacity: 0.8;
  }
</style>