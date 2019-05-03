import { updateGeolocation, UPDATE_GEOLOCATION } from '../actions/geolocation'
import { point, Point, Feature } from '@turf/helpers'
import { StateType } from './index'

export type GeolocationState = {
  position: Feature<Point> | null,
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
        position: point([longitude, latitude]),
        speed: coords.speed || 0
      }
    default:
      return state
  }
}

export default geolocation

export const getCurrentPosition = (state: StateType) => state.geolocation.position
