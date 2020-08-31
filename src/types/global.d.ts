import Vue from 'vue'
import { TranslateResult } from 'vue-i18n'
import * as CryptoJS from 'crypto-js'

// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/global-modifying-module-d-ts.html
// https://stackoverflow.com/questions/42025767/how-to-declare-a-type-globally-in-a-project-typescript
// https://stackoverflow.com/questions/42984889/global-types-in-typescript
// https://github.com/electron/electron/issues/21612#issuecomment-568901193
// https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types


declare global {
  type $TSFixed = any

  type Theme = 'light' | 'dark' | 'night'

  type Language = 'en' | 'it'

  type PayloadType = 'Plaintext' | 'JSON'

  type VueForm = Vue & {
      validate: (validate: (valid: boolean) => void) => void,
      clearValidate: () => void,
      resetFields: () => void,
  }

  interface Options {
      label: string | TranslateResult,
      value: any,
      children?: Options[],
      disabled?: boolean,
  }

  interface App {
      currentTheme: Theme,
      currentLang: Language,
  }

  interface State {
      app: App,
  }

  interface Routes {
      path: string,
      component: any,
      name: string,
      redirect?: string,
      children?: Routes[],
  }

} // end of declare global
