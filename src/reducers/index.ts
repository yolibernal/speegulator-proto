import { combineReducers } from 'redux'

import geolocation from './geolocation'

const reducers = {
  geolocation
}

const rootReducer = combineReducers({
  geolocation
})

type ReturnTypes<T extends {[key: string]: (...args: any[]) => any}> = {
  [K in keyof T]: ReturnType<T[K]>
}

export type StateType = ReturnTypes<typeof reducers>

export default rootReducer
