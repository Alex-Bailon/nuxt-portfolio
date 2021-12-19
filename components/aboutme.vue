<script>
export default {
  name: 'About',
  props: {
    aboutme: {
      default: []
    }
  }
}
</script>

<template>
  <div>
    <p>{{ aboutme.metadata.p1 }}</p>
    <p>{{ aboutme.metadata.p2 }}</p>
    <p>{{ aboutme.metadata.p3 }}</p>
    <p>{{ aboutme.metadata.p4 }}</p>      
    <blockquote class="blockquote py-2"><p><em>{{ aboutme.metadata.quote }}<br/>- {{ aboutme.title }}</em></p></blockquote>
  </div>
</template>