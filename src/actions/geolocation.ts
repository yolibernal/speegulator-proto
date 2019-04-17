import { GeolocationReturnType } from 'react-native'

export const UPDATE_GEOLOCATION = 'UPDATE_GEOLOCATION'

export const updateGeolocation = (geolocation: GeolocationReturnType) => ({
  type: UPDATE_GEOLOCATION,
  geolocation
})
