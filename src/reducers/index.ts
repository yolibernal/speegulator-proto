import { combineReducers } from 'redux'

import geolocation from './geolocation'
import settings from './settings'

const reducers = {
  geolocation,
  settings
}

const rootReducer = combineReducers(reducers)

type ReturnTypes<T extends {[key: string]: (...args: any[]) => any}> = {
  [K in keyof T]: ReturnType<T[K]>
}

export type StateType = ReturnTypes<typeof reducers>

export default rootReducer
