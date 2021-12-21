import { DateTime } from "luxon"
import _ from 'lodash'

export const state = () => ({
  currentSearch: {},
  history: []
})

export const actions = {
  GET_WEATHER: async function({commit, state}, zip) {
    try {
      if ( state.history.filter( item => item.zip == zip ).length == 0 ){
        const current = await this.$axios.$get(`https://api.openweathermap.org/data/2.5/weather?zip=${ zip }&appid=${ process.env.WEATHER_DASHBOARD_API_KEY }`)
        const forecast = await this.$axios.$get(`https://api.openweathermap.org/data/2.5/onecall?lat=${current.coord.lat}&lon=${current.coord.lon}&units=imperial&exclude=minutely,hourly&appid=${ process.env.WEATHER_DASHBOARD_API_KEY }`)
        forecast.city = current.name
        forecast.zip = zip
        commit('setWeather', forecast)
      } else {
        commit('setWeather', state.history.filter( item => item.zip == zip )[0])
      }
    } catch (err) {
      console.log(err)
    }
  },
  SET_WEATHER: async function({commit, state}, weather) {
    if ( !_.isEqual(state.currentSearch, weather) ) commit('setWeather', weather)
  },
}

export const getters = {
  currentWeather: state => {
    return {
      ...state.currentSearch.current,
      date: DateTime.fromSeconds(state.currentSearch.current.dt).toISODate()
    }
  },
  dailyWeather: state => {
    return state.currentSearch.daily.map( day => {
      return {
        ...day,
        date: DateTime.fromSeconds(day.dt).toISODate()
      }
    })
  },
  history: state => {
    return state.history.filter( (item, i) => i < 5 )
  }
 }

export const mutations = {
  setField: function(state, data) {
    state[data.key] = data.value
  },
  setWeather: function(state, data) {
    state.currentSearch = data
    state.history.unshift(data)
  },
}
