declare module 'lodash-id'
declare module 'jump.js'
declare module 'element-ui/lib/transitions/collapse-transition'
declare module 'element-ui/lib/locale' {}
declare module 'element-ui/lib/locale/lang/en' {}
declare module 'element-ui/lib/locale/lang/it' {}
declare module 'crypto-js'

type i18nLocaleModel = ['simulations', 'collabsessions', 'settings', 'common', 'about']

declare module '*.json' {
  const value: any
  export default value
}
