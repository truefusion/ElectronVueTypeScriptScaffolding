import Vue from 'vue'
import { loadSettings, setSettings } from '@/services/electron-services/setting/setting'

const TOGGLE_THEME = 'TOGGLE_THEME'
const TOGGLE_LANG = 'TOGGLE_LANG'

const stateRecord: App = loadSettings()

const app = {
  state: {
    currentTheme: stateRecord.currentTheme || 'light',
    //currentLang: stateRecord.currentLang || 'en',
    //currentTheme: 'light',
  },
  mutations: {
    [TOGGLE_THEME](state: App, currentTheme: Theme) {
      state.currentTheme = currentTheme
    },
    //[TOGGLE_LANG](state: App, currentLang: Language) {
    //  state.currentLang = currentLang
    //},
  },
  actions: {
    TOGGLE_THEME({ commit }: any, payload: App) {
      setSettings('settings.currentTheme', payload.currentTheme)
      commit(TOGGLE_THEME, payload.currentTheme)
    },
    //TOGGLE_LANG({ commit }: any, payload: App) {
    //  setSettings('settings.currentLang', payload.currentLang)
    //  commit(TOGGLE_LANG, payload.currentLang)
    //},
  },
}

export default app
