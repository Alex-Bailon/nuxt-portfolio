<script>
  export default {
    name: 'Portfolio',
    props: {
      projects: {
        default: []
      }
    }
  }
</script>

<template>
  <div>
    <v-row class="px-4 d-flex justify-space-around">
      <v-col v-for="project in projects" :key="project.title" cols="12" sm="6">
        <v-card :height="$vuetify.breakpoint.smAndUp ? '100%' : 'auto'">
          <v-img :src="project.metadata.image && project.metadata.image.url ? project.metadata.image.url : project.metadata.img " height="60%" position="center top" />
          <v-card-title>{{ project.title }}</v-card-title>
          <v-card-text>{{ project.metadata.description }} <br/> <a target="_blank" :href="project.metadata.live">Link to live site</a> <br/> <a target="_blank" :href="project.metadata.github">Link to Github Repository</a> </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-body-2 text-center">
        <p>To view more of my project please vist my <a href="http://github.com/Alex-Bailon" target="_blank">Github</a> or feel free to contact me <a href="mailto:abailon949@gmail.com">here</a>.</p>
      </v-col>
    </v-row>
  </div>
</template>