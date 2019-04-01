import pino from 'pino'
import { Store } from 'redux'
import { updateGeolocation } from '../actions/geolocation'
import Logger from '../Logger'

class GeolocationService {

  private logger: pino.Logger

  constructor(private store: Store) {
    this.logger = Logger.getLoggerForClass(this)
  }

  watchPosition() {
    // optional: get initial position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.handlePositionUpdate(position)
      },
      (error) => {
        this.handlePositionError(error)
      },
      {
        timeout: 5000,
        maximumAge: 0,
        enableHighAccuracy: false,
        distanceFilter: 0,
        useSignificantChanges: false
      }
    )

    navigator.geolocation.watchPosition(
      (position) => {
        this.handlePositionUpdate(position)
      },
      (error) => {
        this.handlePositionError(error)
      },
      {
        // true does not work on emulator (no GPS available)
        enableHighAccuracy: true,
        distanceFilter: 0
      }
    )
  }

  handlePositionUpdate(position) {
    this.store.dispatch(updateGeolocation(position))
  }

  handlePositionError(error) {
    this.logger.warn(error)
  }
}

export { GeolocationService }
