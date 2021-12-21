<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  name: 'WeatherDashboard',
  layout: 'default',
  data() {
    return {
      currentWeatherDisplayFields: [ 'temp',  ]
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
    })
  }
}
</script>

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" class="white--text text-center black">
      <h1>Weather Dashboard</h1>
    </v-col>
    <v-col cols="12" md="3">
      <v-card>
        <v-card-title>
          Dashboard
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Search by zip code"
            id="id"
            outlined
            @change="GET_WEATHER($event)"
          ></v-text-field>
          <h3>Recent Searches</h3>
          <v-list>
            <v-list-item v-for="(item, i) in history" :key="item.city + i" @click="SET_WEATHER(item)" style="border-bottom: 2px solid lightgrey; cursor: pointer;">
              <span>{{ item.city }} ( {{ item.zip }} )</span>
              <v-icon style="margin-left: auto">mdi-chevron-right</v-icon>
            </v-list-item>
          </v-list>          
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="9">
      <v-card min-height="250px" :class="[city ? '' : 'd-flex justify-center align-center']">
        <v-card-title>
          <h1>{{ city ? `${city} ( Currently ${ currentWeather.temp.toFixed(0) }&deg;F )` : 'Search for a city by zip code to begin' }}</h1>
        </v-card-title>
        <v-card-text v-if="city">
          <v-row>
            <v-col cols="12">
              <h2>Forecast:</h2>
            </v-col>
            <v-col v-for="day in dailyWeather" :key="day.date" cols="3">
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

