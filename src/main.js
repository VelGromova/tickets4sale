import Vue from 'vue'
import VModal from 'vue-js-modal'
import Vue2Filters from 'vue2-filters'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import datePicker from 'vue-bootstrap-datetimepicker'
import store from './store'


Vue.config.productionTip = false

Vue.use(VModal, { dialog: true })
Vue.use(Vue2Filters)
Vue.use(BootstrapVue)
Vue.use(datePicker)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
