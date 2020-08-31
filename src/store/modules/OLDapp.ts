import Vue from 'vue'
import { loadSettings, setSettings } from '@/services/electron-services/setting/setting'

const TOGGLE_THEME = 'TOGGLE_THEME'

const stateRecord: App = loadSettings()


const app = {
  state: {
    currentTheme: stateRecord.currentTheme || 'light',
  },
  mutations: {
    [TOGGLE_THEME](state: App, currentTheme: Theme) {
      state.currentTheme = currentTheme
    },
  },
  actions: {
    TOGGLE_THEME({ commit }: any, payload: App) {
      setSettings('settings.currentTheme', payload.currentTheme)
      commit(TOGGLE_THEME, payload.currentTheme)
    },
  },
}

export default app
