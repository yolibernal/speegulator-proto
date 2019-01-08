import { UPDATE_GEOLOCATION } from '../actions/geolocation'

const geolocation = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_GEOLOCATION:
      return action.geolocation
    default:
      return state
  }
}

export default geolocation
