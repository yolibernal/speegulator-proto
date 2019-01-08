import { UPDATE_GEOLOCATION } from '../actions/geolocation'
import { GeolocationReturnType } from 'react-native'

const geolocation = (state = {}, action): (GeolocationReturnType | {}) => {
  switch (action.type) {
    case UPDATE_GEOLOCATION:
      return action.geolocation
    default:
      return state
  }
}

export default geolocation
