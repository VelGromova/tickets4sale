/* eslint-disable no-console,no-undef,no-case-declarations */
import Vuex from 'vuex'
import Vue from 'vue'
import * as _ from 'lodash'

Vue.use(Vuex);

const shows = require('./../assets/shows.csv')

export default new Vuex.Store({
  state: {
    musical: [],
    comedy: [],
    drama: [],
    soledTickets: {}
  },

  getters: {
    tickets(state) {
      return type => {
        let tickets = JSON.parse(window.localStorage.getItem(type))
        if (tickets) {
          state[type] = tickets
        }

        return state[type]
      }
    }
  },

  actions: {
    uploadTickets() {
      if (
        !window.localStorage.getItem('comedy') ||
        !window.localStorage.getItem('drama') ||
        !window.localStorage.getItem('musical')
      ) {
        _.chain(shows)
          .groupBy(show => show.type.toLowerCase())
      .map((showsByType, index) => {
          return {
            type: index,
            shows: _.groupBy(showsByType, 'date')
          }
        })
      .map(data => window.localStorage.setItem(data.type, JSON.stringify(data.shows)))
      .value()

        _.map(['comedy', 'drama', 'musical'], type => {
          if (!window.localStorage.getItem(type)) {
          window.localStorage.setItem(type, JSON.stringify({}))
        }
      }).values()
      }
    }
  }
});
