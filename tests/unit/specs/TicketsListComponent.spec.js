'use strict'
/* eslint-disable no-undef */
import TicketsListComponent from '@/components/TicketsListComponent'
import { shallow, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import Vuex from 'vuex'
import * as _ from 'lodash'
import moment from 'moment'

const shows = [
  {
    name: '1984',
    date: moment().format('YYYY-MM-DD'),
    type: 'DRAMA'
  },

  {
    name: '39 STEPS',
    date: moment().format('YYYY-MM-DD'),
    type: 'COMEDY'
  }
]

let tickets = {}

_.chain(shows)
  .groupBy(show => show.type.toLowerCase())
  .map((showsByType, index) => tickets[index] = _.groupBy(showsByType, 'date'))
  .value()

describe('TicketsListComponent.vue', () => {
  let localVue
  let wrapper

  let computed = {
    tickets () {
      return type => {
        return tickets[type]
      }
    }
  }

  beforeEach(() => {
    localVue = createLocalVue()
    localVue.use(Vuex)

    wrapper = shallow(TicketsListComponent, {
        localVue,
        computed,
        mocks: {
          $store: {
            dispatch: dispatch => dispatch
        }
      },
      stubs: {}
    })
  })

  afterEach(() => {
    wrapper.vm.$destroy()
  })

  it('Should displays no musical', () => {
    let expectedResult = []

    expect(wrapper.vm.getTicketsForDisplay('musical')).to.deep.equal(expectedResult)
  })

  it('Should displays drama', () => {
    let expectedResult = [{
      'date': '2018-05-27',
      'name': '1984',
      'type': 'DRAMA'
    }]

    expect(wrapper.vm.getTicketsForDisplay('drama')).to.deep.equal(expectedResult)
  })
})
