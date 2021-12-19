<template>
  <v-app >
    <v-main>
      <v-container fluid style="background-image: linear-gradient(to bottom right, red, blue );" >
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
