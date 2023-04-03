<template>
  <v-app >
    <!-- <client-only>
      <vue-particles
        color="#FF00FF"
        style="z-index: 5"
        :particle-opacity="0.5"
        :particles-number="$vuetify.breakpoint.smAndUp ? 300 : 150"
        shape-type="circle"
        :particle-size="3.7"
        lines-color="#FF00FF"
        :lines-width="2"
        :line-linked="true"
        :line-opacity="0.2"
        :lines-distance="150"
        :move-speed="4"
      />
    </client-only> -->
    <!-- <div class="cursor"></div> -->
    <v-app-bar fixed>
      <v-app-bar-title>Alex Bailon</v-app-bar-title>
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
      <v-container>
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
  mounted(){
    this.$gsap.set(".cursor", {xPercent: -50, yPercent: -50});

    const cursor = document.querySelector(".cursor");
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.2;

    const xSet = this.$gsap.quickSetter(cursor, "x", "px");
    const ySet = this.$gsap.quickSetter(cursor, "y", "px");

    window.addEventListener("mousemove", e => {    
      mouse.x = e.x;
      mouse.y = e.y;  
    })

    this.$gsap.ticker.add(() => {
      // adjust speed for higher refresh monitors
      const dt = 1.0 - Math.pow(1.0 - speed, this.$gsap.ticker.deltaRatio()); 
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      xSet(pos.x);
      ySet(pos.y);
    })
  }  
}
</script>

<style>
  .gradient {
    /* background-image: linear-gradient(to bottom right, #8b0000 , #00008b  ); */
  }
  .v-main {
    padding: 52px 0px !important;
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
</style>