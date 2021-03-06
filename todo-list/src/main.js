import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit, faPlusSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

library.add(faTrash, faEdit, faPlusSquare, faPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
