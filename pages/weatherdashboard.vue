<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { mdiChevronRight } from '@mdi/js'

export default {
  name: 'WeatherDashboard',
  layout: 'default',
  data() {
    return {
      loading: false,
      mdiChevronRight
    }
  },
  computed: {
    ...mapState({
      city: state => state.weatherdashboard.currentSearch.city,
    }),
    ...mapGetters({
      currentWeather: 'weatherdashboard/currentWeather',
      dailyWeather: 'weatherdashboard/dailyWeather',
      history: 'weatherdashboard/history',
    })
  },
  methods: {
    ...mapActions({
      GET_WEATHER: 'weatherdashboard/GET_WEATHER',
      SET_WEATHER: 'weatherdashboard/SET_WEATHER'
    }),
    async getWeather($event){
      this.loading = true
      await this.GET_WEATHER($event)
      this.loading = false
    }
  }
}
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="white--text text-center black" style="z-index: 7">
      <h1>Weather Dashboard</h1>
    </v-col>
    <v-col cols="12" md="3">
      <v-card style="z-index: 7">
        <v-card-title>
          Dashboard
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Search by zip code"
            type="number"
            outlined
            hide-spin-buttons
            @change="getWeather"
          ></v-text-field>
          <h3>Recent Searches</h3>
          <v-list>
            <v-list-item v-for="(item, i) in history" :key="item.city + i" @click="SET_WEATHER(item)" style="border-bottom: 2px solid lightgrey; cursor: pointer;">
              <span>{{ item.city }} ( {{ item.zip }} )</span>
              <v-icon style="margin-left: auto">{{ mdiChevronRight }}</v-icon>
            </v-list-item>
          </v-list>          
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="9">
      <v-card min-height="250px" :class="[city ? '' : 'd-flex justify-center align-center']" :loading="loading" style="z-index: 7" >
        <v-card-title>
          <h1>{{ city ? `${city} ( Currently ${ currentWeather.temp.toFixed(0) }&deg;F )` : 'Search for a city by zip code to begin' }}</h1>
        </v-card-title>
        <v-card-text v-if="city">
          <v-row>
            <v-col cols="12">
              <h2>Forecast:</h2>
            </v-col>
            <v-col
              v-for="(day, index) in dailyWeather" 
              :key="day.date"
              cols="12" 
              sm="3"
              v-gsap.fromTo="[
                { opacity: 0, y: 150 },
                { opacity: 1, y: 0, duration: 0.5, delay: index/6 },
              ]"
            >
              <v-card>
                <v-card-title>
                  {{ day.date }}
                  <v-img max-width="35px" :src="`https://openweathermap.org/img/w/${day.weather[0].icon}.png`" />
                </v-card-title>
                <v-card-text>
                  Min: {{ day.temp.min.toFixed(0) }}&deg;F <br/>
                  Max: {{ day.temp.max.toFixed(0) }}&deg;F <br/>
                  Winds: {{ day.wind_speed.toFixed(0) }} MPH
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

