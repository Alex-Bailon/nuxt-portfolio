<script>
import { mdiChevronDown, mdiDownload } from '@mdi/js'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import data from '@/assets/data'

export default {
  name: 'IndexPage',
  layout: 'default',
  components: {
    VueSlickCarousel
  },
  async asyncData() {
    return {
      mdiChevronDown,
      mdiDownload,
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
        value: "Hi, welcome! My name is Alex Bailon &#9995;"
      }, 
      duration: 5,
      delay: 0.5, 
      ease: "none",
      onUpdate: () => text.appendChild(cursor),
    })
    this.showContent()
  },
  computed: {
    bio() {
      return data.bio
    },
    refs() {
      return data.refs
    },
    accordion() {
      return [{
        title: 'Tech Stack',
        list: data.techStack
      },
      {
        title: 'Skills',
        list: data.skills
      },
      {
        title: 'Hobbies',
        list: data.hobbies
      }]
    },
    projects() {
      return data.projects
    },
    experience() {
      return data.experience
    }
  },
  methods: {
    showContent() {
      this.$ScrollTrigger.create({
        trigger: '.intoWrapper',
        animation: this.introTimeline(),
        fastScrollEnd: true,
        once: true
      })
      this.$ScrollTrigger.create({
        trigger: '.projectsWrapper',
        animation: this.projectsTimeline(),
        fastScrollEnd: true,
        once: true
      })
      this.$ScrollTrigger.create({
        trigger: '.refWrapper',
        animation: this.refTimeline(),
        fastScrollEnd: true,
        once: true
      })
      this.$ScrollTrigger.create({
        trigger: '.experienceWrapper',
        animation: this.experienceTimeline(),
        fastScrollEnd: true,
        once: true,
        start: "top center",
        toggleActions: "play none none none"
      })
      setTimeout(() => {
        this.$ScrollTrigger.refresh(true)
      }, 500);
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
      tl.from('.experienceWrapper h3', { opacity: 0, duration: 1 })
      tl.from('.experienceWrapper .v-timeline-item__opposite', { 
        opacity: 0,
        stagger: 0.2
      })
      tl.from('.experienceWrapper .v-timeline-item__body', { 
        opacity: 0,
        x: (index) => index % 2 === 0 ? 250 : -250,
        stagger: 0.2
      }, '<')
      return tl
    }    
  }
}
</script>

<template>
  <div>
    <v-row class="contentwrapper">
      <v-col cols="12" class="heroContainer">
        <div class="imageWrapper">
          <v-img src="/AlexBailon.webp" class="myImage" aspect-ratio="1" width="300" max-width="100%" position="left" />
        </div>
        <div>
          <v-row class="intoWrapper" justify="center" align="center">
            <v-col cols="12" >
              <h1 class="introText">
                <span class="textCursor">|</span>
              </h1>
            </v-col>
          </v-row>
          <h1 class="name_text">Sr Full Stack Developer + DevOps + Technical Team Lead</h1>
        </div>
      </v-col>
      <v-col>
        <v-row justify="space-between">
          <v-col cols="12" md="7" class="aboutMeWrapper">
            <h2>About Alex</h2>
            <p v-html="bio"></p>
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
                    <template v-if="item.title === 'Tech Stack'">
                      <li v-for="(technologies, category) in item.list" :key="category">
                        <strong>{{ category }}:</strong>
                        <ul>
                          <li v-for="tech in technologies" :key="tech">{{ tech }}</li>
                        </ul>
                      </li>
                    </template>
                    <template v-else>
                      <li v-for="li in item.list" :key="li.item">{{li}}</li>
                    </template>
                  </ul>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <blockquote class="blockquote py-8"><p><em>Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.<br/>- Albert Einstein</em></p></blockquote>            
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
          <div v-for="item in refs" :key="item.name">
            <v-card flat class="ma-3 refCards" height="560">
              <v-card-text>{{item.ref}}</v-card-text>
              <v-card-actions class="d-flex align-center pt-0 pl-4">
                <div>
                  <div class="text-h6">{{item.name}}</div>
                  <div class="text-subtitle-1">{{item.relation}}</div>
                </div>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  :href="item.linkedin"
                  target="_blank"
                >
                  View LinkedIn
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </VueSlickCarousel>
      </v-col>
      <v-col cols="12" class="experienceWrapper">
        <h3>My Experience ({{ new Date().getFullYear() - 2020 }}+ Years)</h3>
        <v-timeline>
          <v-timeline-item
            v-for="(exp, index) in experience"
            :key="index"
          >
            <template v-slot:icon>
              <div class="custom-timeline-dot"></div>
            </template>
            <template v-slot:opposite>
              <span class="text-subtitle-2 font-weight-medium">{{ exp.period }}</span>
            </template>
            <v-card class="elevation-1">
              <v-card-title class="text-h6">
                {{ exp.title }}
              </v-card-title>
              <v-card-subtitle>
                {{ exp.company }} | {{ exp.location }}
              </v-card-subtitle>
              <v-card-text>
                <ul>
                  <li v-for="(resp, idx) in exp.responsibilities" :key="idx">
                    {{ resp }}
                  </li>
                </ul>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
        <div class="text-center mt-6">
          <v-btn
            color="primary"
            href="/A_Bailon_Resume.pdf"
            target="_blank"
            download="Alex_Bailon_Resume.pdf"
            elevation="2"
          >
            <v-icon left>{{mdiDownload}}</v-icon>
            Download Resume
          </v-btn>
        </div>
      </v-col>      
    </v-row>
  </div>
</template>

<style scoped>
.imageWrapper {
  width: 300px;
  max-width: 100%;
  height: 300px;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  position: relative;
}

@property --angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

.imageWrapper::before, .imageWrapper::after {
  --angle: 0deg;
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  background-image: conic-gradient(from var(--angle), #FA08FA, #1B406B, #FA08FA, #1B406B, #FA08FA);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) ;
  border-radius: 6px;
  z-index: -1;
  animation: spin 3s linear infinite;
}

.imageWrapper::before {
  filter: blur(10px);
  opacity: 0.8;
}

@keyframes spin {
  from {
    --angle: 0deg;
  }
  to {
    --angle: 360deg;
  }
}

.custom-timeline-dot {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(to bottom right, #FA08FA 0%, #1B406B 100%) !important;
}
</style>

