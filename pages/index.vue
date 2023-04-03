<script>
export default {
  name: 'IndexPage',
  layout: 'default',
  async asyncData({$axios}) {
    const timeline = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects?pretty=true&query=%7B%22type%22%3A%22time-lines%22%7D&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&limit=20&props=slug,title,content,metadata')
    const aboutme = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects/6056606482408b0007b7f1d2?pretty=true&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&props=slug,title,content,metadata')
    const projects = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects?pretty=true&query=%7B%22type%22%3A%22projects%22%7D&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&limit=20&props=slug,title,content,metadata')
    return {
      timelineItems: timeline.data.objects,
      tabs: [
        {
          title: 'About Me',
          component: 'Aboutme'
        },
        {
          title: 'Portfolio',
          component: 'Portfolio'
        },
        {
          title: 'Resume',
          component: 'Resume'
        },      
        {
          title: 'Contact',
          component: 'Contact'
        }
      ],
      tabSelected: 0,
      aboutme: aboutme.data.object,
      projects: projects.data.objects,
      welcomeComplete: false
    }
  },
  mounted(){
    let cursor = document.querySelector(".textCursor");
    let text = document.querySelector(".introText");
    this.$gsap.fromTo(cursor, {autoAlpha: 0, x: 2}, {autoAlpha: 1, duration: 0.5, repeat: -1, ease: 'steps(1)'});
    this.$gsap.to(".introText", {
      text: {
        value: "Hi, welcome! <br/> My name is Alex Bailon &#9995; <br/> Hope you enjoy my portfolio!"
      }, 
      duration: 5,
      delay: 1, 
      ease: "none",
      onUpdate: () => text.appendChild(cursor),
      onComplete: () => this.showContent()
    })
  },
  methods: {
    showContent() {
      this.$gsap.to('.introText', { 
        opacity: 0, 
        transform: 'perspective(400px) rotate3d(1, 0, 0, -90deg)', 
        delay: 1, 
        onComplete: () => {
          this.$gsap.set('.intoWrapper', {display: 'none'})
          this.$gsap.to('header', {opacity: 1})
          this.welcomeComplete = true
        }
      })
    }
  }
}
</script>

<template>
  <div>
    <v-row class="screenContainer intoWrapper" justify="center" align="center">
      <v-col cols="12" >
        <h1 class="introText text-center">
          <span class="textCursor">|</span>
        </h1>
      </v-col>
    </v-row>
    <v-row v-show="welcomeComplete" class="screenContainer" justify="center" align="center">
      <v-col cols="12" class="heroContainer">
        <v-img src="/AlexBailon.webp" class="myImage" aspect-ratio="1" width="300" max-width="100%" />
        <h1 class="name_text">Full Stack Developer + DevOps</h1>
      </v-col>
      <v-col>
        <h2>About Alex</h2>
      </v-col>
    </v-row>
  </div>
</template>

