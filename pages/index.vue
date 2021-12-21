<script>
import { mdiGithub, mdiLinkedin, mdiCalendarCheckOutline, mdiBriefcaseOutline, mdiSchoolOutline, mdiCrosshairsGps } from '@mdi/js'
export default {
  name: 'IndexPage',
  layout: 'default',
  async asyncData({$axios}) {
    const timeline = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects?pretty=true&query=%7B%22type%22%3A%22time-lines%22%7D&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&limit=20&props=slug,title,content,metadata')
    const aboutme = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects/6056606482408b0007b7f1d2?pretty=true&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&props=slug,title,content,metadata')
    const projects = await $axios.get('https://api.cosmicjs.com/v2/buckets/nuxt-portfolio-production/objects?pretty=true&query=%7B%22type%22%3A%22projects%22%7D&read_key=LPx3LELVgjXcFbGKD3xjBQGNVd87FsFbK9bbCeO9MJ8lFGNcLN&limit=20&props=slug,title,content,metadata')
    return {
      icons: {
        mdiGithub,
        mdiLinkedin,
        mdiCalendarCheckOutline,
        mdiBriefcaseOutline,
        mdiSchoolOutline,
        mdiCrosshairsGps,
      },
      socials: [
        {
          icon: 'mdiGithub',
          color: 'purple darken-1',
          link: 'https://github.com/Alex-Bailon',
          value: 'Github'
        },
        {
          icon: 'mdiLinkedin',
          color: 'cyan darken-1',
          link: 'https://www.linkedin.com/in/alex-bailon',
          value: 'Linkedin'
        },
      ],
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
          title: 'Contact',
          component: 'Contact'
        },                
      ],
      tabSelected: 0,
      aboutme: aboutme.data.object,
      projects: projects.data.objects
    }
  },
}
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="4">
      <v-card
        class="mx-auto"
        max-width="344"
      >
        <v-card-title class="pt-4">
          <h1 style="font-size: 36px">Alex Bailon</h1> 
        </v-card-title>
        <v-card-subtitle class="pb-0">
          <h2 style="font-size: 16px">Full Stack Developer</h2>
          <v-btn
            v-for="(social, i) in socials"
            :key="i"
            :color="social.color"
            class="white--text"
            fab
            icon
            small
            :href="social.link"
            target="_blank"
            :value="social.value"
          >
            <v-icon large>{{ icons[social.icon] }}</v-icon>
          </v-btn>
        </v-card-subtitle>
        <v-card-text>
          <v-img id="profileImg" src="/AlexBailon.webp" alt="Alex Bailon with Grand Canyon in the background" />
          <v-timeline dense>
            <v-timeline-item v-for="( item, i ) in timelineItems" :key="i" class="timelineItem" :color="item.metadata.color" :icon="icons[item.metadata.icon]" fill-dot large>
              <p><strong>{{ item.metadata.title }}:</strong> <br/> {{ item.metadata.text }}</p>
            </v-timeline-item>
          </v-timeline>
          <v-btn block depressed outlined href="https://alex-bailon.github.io/assets/images/A_Bailon_Resume.pdf" target="_blank">
            <v-icon left>mdi-file-document</v-icon> Resume
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="8">
      <v-card id="tabsCard">
        <v-tabs v-model="tabSelected" show-arrows right grow>
          <v-tab v-for="tab in tabs" :key="tab.title">
            <h3>{{ tab.title }}</h3>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabSelected">
          <v-tab-item
            v-for="tab in tabs"
            :key="tab.component"
          >
            <v-card flat>
              <v-card-text>
                <component :is="tab.component" :aboutme="aboutme" :projects="projects"></component>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

