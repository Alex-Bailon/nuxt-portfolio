<template>
  <v-app >
    <client-only>
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
    </client-only>
    <v-main class="gradient" >
      <v-container fluid style="height: 100%">
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
      style="z-index: 7"
    >
      <span> Alex Bailon &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {}
  }
}
</script>

<style>
  .gradient {
    background-image: linear-gradient(to bottom right, #8b0000 , #00008b  );
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
</style>