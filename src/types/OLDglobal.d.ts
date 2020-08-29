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

  interface SSLPath {
      rejectUnauthorized?: boolean,
      ca: string,
      cert: string,
      key: string,
  }

  interface SSLContent {
      ca: string | string[] | Buffer | Buffer[] | undefined,
      cert: string | string[] | Buffer | Buffer[] | undefined,
      key: string | string[] | Buffer | Buffer[] | undefined,
  }

  interface Options {
      label: string | TranslateResult,
      value: any,
      children?: Options[],
      disabled?: boolean,
  }

  interface userId {
      name: string,
      surname: string,
      companyname: string
  }

  interface CollabSession {
      readonly id: string,
      readonly timestamp: Date,
      collabsession_users: userId[],
  }

  interface ActiveCollabSession {
      readonly id: string,
      readonly timestamp: Date
  }

  interface AccountCheck {
      readonly paymentCheck: boolean,
      readonly biometricAuthorized: boolean,
      readonly companyCheck: boolean,
  }

  interface ActiveSimulation {
      readonly id: string,
      readonly timestap: Date
  }

  type encryptedBlob = CryptoKeyPair;

  interface SimulationModel {
      id: string,
      timestamp: Date,
      // https://developer.mozilla.org/en-US/docs/Web/API/Blob
      simulationData:  encryptedBlob,
  }

  interface Simulations {
      id: string,
      timestamp: Date,
      simulations: SimulationModel[],
  }

  // https://github.com/hello-efficiency-inc/raven-reader
  interface ActiveInfoSubscription {
      readonly topic: string,
      readonly timestamp: Date
  
  }

  interface InfoSubscriptionModel {
      topic: string,
      retain?: boolean
  }

  interface InfoSubscriptions {
      subscriptions: InfoSubscriptionModel[],
  }

  interface InfoSubscriptionsVisible {
      showInfoSubscription: boolean,
  }

  interface App {
      currentTheme: Theme,
      //currentLang: Language,
      //showInfoSubscriptions: boolean,
      //activeSimulation: {
      //    [id: string]: {
      //        collab_session: CollabSession
      //    }
      //},
      //allSimulations: SimulationModel[] | [],
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
