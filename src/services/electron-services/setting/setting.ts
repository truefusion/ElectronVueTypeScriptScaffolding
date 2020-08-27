// https://github.com/emqx/MQTTX/blob/master/src/utils/api/setting.ts

import db from '../database/index'

export const loadSettings = (): App => {
  return db.get<App>('settings')
}

export const setSettings = (
  key: string, 
  value: string | boolean | number,
): string | boolean | number => {
  return db.set<string | boolean | number>(key, value)
}

export default {}
