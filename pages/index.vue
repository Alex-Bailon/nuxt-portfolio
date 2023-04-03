<script>
import { mdiChevronDown } from '@mdi/js'
export default {
  name: 'IndexPage',
  layout: 'default',
  async asyncData({$axios}) {
    // const timeline = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects?pretty=true&query=%7B%22type%22%3A%22time-lines%22%7D&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&limit=20&props=slug,title,content,metadata')
    const aboutme = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects/6056606482408b0007b7f1d2?pretty=true&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&props=slug,title,content,metadata')
    // const projects = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects?pretty=true&query=%7B%22type%22%3A%22projects%22%7D&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&limit=20&props=slug,title,content,metadata')
    return {
      // timelineItems: timeline.data.objects,
      mdiChevronDown,
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
      aboutme: aboutme.data.object,
      accordion: [
        {
          title: 'Tech Stack'
        },
        {
          title: 'Skills'
        },
        {
          title: 'Hobbies'
        }
      ],
      // projects: projects.data.objects,
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
        height: 2,
        overflow: 'hidden',
        // transform: 'perspective(400px) rotate3d(1, 0, 0, -90deg)', 
        delay: 1,
        onComplete: () => {
          this.$gsap.set('.intoWrapper', {display: 'none'})
          this.$gsap.to('header, .contentwrapper', {opacity: 1})
          this.$gsap.from('.myImage', {opacity: 0, scale: 0.5, delay: 0.5})
          this.$gsap.from('.name_text', {opacity: 0, x: 250, delay: 0.5})
          this.$gsap.from('.aboutMeWrapper', {opacity: 0, y: 250, delay: 0.5})
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
    <v-row v-show="welcomeComplete" class="contentwrapper">
      <v-col cols="12" class="heroContainer">
        <v-img src="/AlexBailon.webp" class="myImage" aspect-ratio="1" width="300" max-width="100%" />
        <h1 class="name_text">Full Stack Developer + DevOps</h1>
      </v-col>
      <v-col class="aboutMeWrapper">
        <v-row justify="space-between">
          <v-col cols="12" md="7">
            <h2>About Alex</h2>
            <p v-html="aboutme.metadata.p1"></p>
          </v-col>
          <v-col cols="12" md="4" class="d-flex flex-column justify-center">
            <v-expansion-panels accordion>
              <v-expansion-panel
                v-for="(item,i) in accordion"
                :key="i"
                class="transparent"
              >
                <v-expansion-panel-header>
                  <template v-slot:actions>
                      <v-icon class="icon">{{mdiChevronDown}}</v-icon>
                  </template>
                  {{item.title}}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <blockquote class="blockquote py-8"><p><em>{{ aboutme.metadata.quote }}<br/>- {{ aboutme.title }}</em></p></blockquote>            
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

