import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)


// axios
import axios from "./axios.js"

Vue.prototype.$http = axios

// Theme Configurations
import '../themeConfig.js'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css'


// Vue Router
import router from './router'


// Vuex Store
import store from './store/store'


// Vuejs - Vue wrapper for hammerjs
import {VueHammer} from 'vue2-hammer'

Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

//VeeValidate
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)

// Feather font icon
require('./assets/css/iconfont.css')

// Global events
import {globalEvents} from "./globalEvents";

// Service Provider
import{ServiceProvider} from "./services/ServiceProvider"


Vue.config.productionTip = false

new Vue({
  router,
  store,
  globalEvents,
  ServiceProvider,
  render: h => h(App)
}).$mount('#app')
