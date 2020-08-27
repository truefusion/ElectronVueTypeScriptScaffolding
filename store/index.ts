import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import getters from './getter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    //app,
  },
  getters,
})

// https://stackoverflow.com/questions/24601985/morris-js-uncaught-typeerror-cannot-read-property-match-of-undefined
