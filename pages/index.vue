<script>
import { mdiChevronDown } from '@mdi/js'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  name: 'IndexPage',
  layout: 'default',
  components: {
    VueSlickCarousel
  },
  async asyncData({$axios}) {
    // const timeline = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects?pretty=true&query=%7B%22type%22%3A%22time-lines%22%7D&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&limit=20&props=slug,title,content,metadata')
    const aboutme = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects/6056606482408b0007b7f1d2?pretty=true&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&props=slug,title,content,metadata')
    const projects = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects?pretty=true&query=%7B%22type%22%3A%22projects%22%7D&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&limit=20&props=slug,title,content,metadata')
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
          title: 'Tech Stack',
          list: aboutme.data.object.metadata.tech_stack
        },
        {
          title: 'Skills',
          list: aboutme.data.object.metadata.skills
        },
        {
          title: 'Hobbies',
          list: aboutme.data.object.metadata.hobbies
        }
      ],
      projects: projects.data.objects,
      welcomeComplete: false,
      settings: {
        arrows: true,
        slidesToShow: 3,
        responsive: [
          {
            breakpoint: 960,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      }        
    }
  },
  mounted(){
    let cursor = document.querySelector(".textCursor");
    let text = document.querySelector(".introText");
    this.$gsap.fromTo(cursor, {autoAlpha: 0, x: 2}, {autoAlpha: 1, duration: 0.5, repeat: -1, ease: 'steps(1)'});
    this.$gsap.to(".introText", {
      text: {
        value: "Hi, welcome! <br/> My name is Alex Bailon &#9995;"
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
          this.$gsap.set('.contentwrapper', {opacity: 1})
          this.welcomeComplete = true
          this.$ScrollTrigger.create({
            trigger: '.intoWrapper',
            animation: this.introTimeline(),
            fastScrollEnd: true,
          })
          this.$ScrollTrigger.create({
            trigger: '.projectsWrapper',
            animation: this.projectsTimeline(),
            fastScrollEnd: true,
          })
          this.$ScrollTrigger.create({
            trigger: '.refWrapper',
            animation: this.refTimeline(),
            fastScrollEnd: true,
          })
          this.$ScrollTrigger.create({
            trigger: '.experienceWrapper',
            animation: this.experienceTimeline(),
            fastScrollEnd: true
          })
          setTimeout(() => {
            this.$ScrollTrigger.refresh(true)
          }, 500);
        }
      })
    },
    introTimeline(){
      const tl = this.$gsap.timeline({ease: "power1.out"})
      tl.from('.myImage', {opacity: 0, scale: 0.5})
      tl.from('.name_text', {opacity: 0, x: 250})
      tl.from('.aboutMeWrapper', {opacity: 0, y: 250})
      tl.from('.v-expansion-panel, .blockquote', {opacity: 0, x: 250, stagger: 0.2 })
      return tl
    },
    projectsTimeline(){
      const tl = this.$gsap.timeline({ease: "power1.out"})
      tl.from('.projectsWrapper h3', { opacity: 0, y: 250 })
      tl.add('showSilder')
      tl.from('.cardContainer', { opacity: 0, y: 250, stagger: 0.2 }, 'showSilder')
      tl.from('.slick-arrow', { opacity: 0, delay: 0.5 }, 'showSilder')
      return tl
    },
    refTimeline(){
      const tl = this.$gsap.timeline({ease: "power1.out"})
      tl.from('.refWrapper h3', { opacity: 0, x: -250 })
      tl.from('.refCards', { x: -250, opacity: 0, stagger: 0.2 })
      return tl
    },
    experienceTimeline(){
      const tl = this.$gsap.timeline({ease: "power1.out"})
      tl.from('.experienceWrapper', { opacity: 0, duration: 1.5 })
      return tl
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
      <v-col>
        <v-row justify="space-between">
          <v-col cols="12" md="7" class="aboutMeWrapper">
            <h2>About Alex</h2>
            <p v-html="aboutme.metadata.p1"></p>
          </v-col>
          <v-col cols="12" md="4" class="d-flex flex-column justify-center panels">
            <v-expansion-panels accordion flat>
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
                  <ul>
                    <li v-for="li in item.list" :key="li.item">{{li.item}}</li>
                  </ul>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <blockquote class="blockquote py-8"><p><em>{{ aboutme.metadata.quote }}<br/>- {{ aboutme.title }}</em></p></blockquote>            
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="projectsWrapper">
        <h3>My Work</h3>
        <VueSlickCarousel v-bind="settings" >
          <div v-for="project in projects" :key="project.title" class="cardContainer">
            <v-card height="550" flat class="ma-3">
              <v-img :src="project.metadata.image && project.metadata.image.url ? project.metadata.image.url : project.metadata.img " height="50%" position="center top" />
              <v-card-title>{{ project.title }}</v-card-title>
              <v-card-text>{{ project.metadata.description }} <br/> <a target="_blank" :href="project.metadata.live">Link to live site</a> <br/> <a target="_blank" :href="project.metadata.github">Link to Github Repository</a> </v-card-text>
            </v-card>
          </div>
        </VueSlickCarousel>
      </v-col>
      <v-col cols="12" class="refWrapper">
        <h3>What Others Have to Say</h3>
        <VueSlickCarousel v-bind="settings" >
          <div v-for="item in aboutme.metadata.refs" :key="item.name">
            <v-card flat class="ma-3 refCards" height="550">
              <div class="d-flex align-center">
                <img :src="item.img.imgix_url" width="100" class="ml-4 mt-4 refImg" />
                <div>
                  <v-card-title>{{item.name}}</v-card-title>
                  <v-card-subtitle>{{item.relation}}</v-card-subtitle>
                </div>
              </div>
              <v-card-text>{{item.ref}}</v-card-text>
              <v-card-actions class="pt-0 pl-4">
                <a>{{item.name}}'s LinkedIn</a>
              </v-card-actions>
            </v-card>
          </div>
        </VueSlickCarousel>
      </v-col>
      <v-col cols="12" class="experienceWrapper">
        <h3>My Experience ({{ new Date().getFullYear() - 2020 }}+ Years)</h3>
        <object data="/A_Bailon_Resume.pdf" type="application/pdf" width="100%" height="550px">
          <div>No online PDF viewer installed</div>
          <a href="/A_Bailon_Resume.pdf" target="_blank">You can download here</a>
        </object>
        <div>
        </div>
      </v-col>      
    </v-row>
  </div>
</template>

