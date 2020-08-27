import VueI18n from 'vue-i18n'

// https://kazupon.github.io/vue-i18n/guide/messages.html#structure

export const formati18n = (transItems: i18nLocaleModel): VueI18n.LocaleMessages => {
  const en: any = {
    simulations: {},
    collabsessions: {},
    settings: {},
    common: {},
    about: {},
  }
  const it: any = {
    simulations: {},
    collabsessions: {},
    settings: {},
    common: {},
    about: {},
  }
  transItems.forEach((item) => {
    const values = require(`@/services/electron-services/lang/${item}`).default

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    Object.keys(values).forEach((key: string) => {
      const { it: $it, en: $en } = values[key]
      en[item][key] = $en
      it[item][key] = $it
    })
  })
  return { en, it }
}
