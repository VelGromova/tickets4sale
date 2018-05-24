import Vuex from 'vuex'
import Vue from 'vue'
import * as _ from 'lodash'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    musicalTickets: [],
    comedyTickets: [],
    dramaTickets: []
  },

  getters: {
    tickets (state) {
      return type => {
        switch (type) {
          case 'comedy':
            let comedyTickets = JSON.parse(window.localStorage.getItem('comedyTickets'))
            if (comedyTickets) {
              state.comedyTickets = comedyTickets
            }

            return state.comedyTickets

          case 'musical':
            let musicalTickets = JSON.parse(window.localStorage.getItem('musicalTickets'))
            if (musicalTickets) {
              state.musicalTickets = musicalTickets
            }

            return state.musicalTickets

          case 'drama':
            let dramaTickets = JSON.parse(window.localStorage.getItem('dramaTickets'))
            if (dramaTickets) {
              state.dramaTickets = dramaTickets
            }

            return state.dramaTickets

          default:
            throw Error('Not found type of ticket')
        }
      }
    }
  },

  actions: {
    uploadTickets () {
      let shows = require('./../assets/shows.csv')
      let groupedShowsByTypeAndDate = {}
      _.chain(shows)
        .groupBy('type')
        .map((showsByType,index) => groupedShowsByTypeAndDate[index] = _.groupBy(showsByType, 'date'))
    .value()
      // _.map(_.groupBy(shows, 'type'), (typedTickets, index) => {
      //     groupedTicketsByType[index] = _.groupBy(typedTickets, 'date')
      // })

      console.log(groupedShowsByTypeAndDate)
    }
  }
});
