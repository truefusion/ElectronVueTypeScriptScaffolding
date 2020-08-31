import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'

// https://github.com/ElementUI/lib
//import 'element-ui/lib/theme-chalk/index.css'
//import ElementLocale from 'element-ui/lib/locale'
//import element from './services/electron-services/element/element'

// https://kazupon.github.io/vue-i18n/
//import VueI18n from 'vue-i18n'

//Vue.use(element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
