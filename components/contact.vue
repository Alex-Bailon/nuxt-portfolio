<script>
export default {
  name: 'Contact',
  data(){
    return {}
  },
  computed: {
    required() {
      return v => !!v || 'Field is required'
    },
    emailRules() {
      return [
        v => v.length <= 320 || 'Email is too long',
        v => /\S+@\S+\.\S+/.test(v) || 'E-mail must be valid',
      ]     
    }
  },
}
</script>

<template>
  <h4>
    For the quickest response please reach out to me on <a href="https://www.linkedin.com/in/alex-bailon" target="_blank">LinkedIn</a>
  </h4>
</template>
