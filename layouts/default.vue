<template>
  <v-app >
    <v-main class="gradient" >
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      absolute
      app
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

<style scoped>
  .gradient {
    background-image: linear-gradient(to bottom right, red, blue );
  }
</style>