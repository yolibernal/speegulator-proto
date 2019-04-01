import { combineReducers } from 'redux'

import geolocation from './geolocation'
import settings from './settings'
import bluetooth from './bluetooth'

const reducers = {
  geolocation,
  settings,
  bluetooth
}

const rootReducer = combineReducers(reducers)

type ReturnTypes<T extends {[key: string]: (...args: any[]) => any}> = {
  [K in keyof T]: ReturnType<T[K]>
}

export type StateType = ReturnTypes<typeof reducers>

export default rootReducer
