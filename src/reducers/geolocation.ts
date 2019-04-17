import { updateGeolocation, UPDATE_GEOLOCATION } from '../actions/geolocation'
import { GeolocationReturnType } from 'react-native'
import Position from '../services/geolocation/Position'

export type GeolocationState = {
  position: Position | null,
  speed: number
}

const initialState: GeolocationState = {
  position: null,
  speed: 0
}

const geolocation = (
  state = initialState,
  action: ReturnType<typeof updateGeolocation>
): GeolocationState => {
  switch (action.type) {
    case UPDATE_GEOLOCATION:
      const { coords } = action.geolocation
      const { longitude, latitude } = coords
      return {
        position: {
          longitude,
          latitude
        },
        speed: coords.speed || 0
      }
    default:
      return state
  }
}

export default geolocation
