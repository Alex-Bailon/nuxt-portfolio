<script>
  export default {
    name: 'Resume',
    data(){
      return {
        pdfHeight: 500
      }
    },
    mounted(){
      this.pdfHeight = window.innerHeight * 0.8
    }
  }
</script>

<template>
  <v-row>
    <v-col cols="12">
      <embed src="https://alex-bailon.github.io/assets/images/A_Bailon_Resume.pdf" width="100%" :height="pdfHeight">
    </v-col>
  </v-row>
</template>