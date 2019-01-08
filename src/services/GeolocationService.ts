import { Store } from 'redux'
import { updateGeolocation } from '../actions/geolocation'

class GeolocationService {

  constructor(private store: Store) {

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
    console.warn(error)
  }
}

/*
  componentDidMount() {
    navigator.geolocation.watchPosition(
      (position) => {
        const maxSpeed = Math.max(this.state.speed, position.coords.speed || 0)
        this.setState(prevState => ({
          speed: position.coords.speed,
          counter: prevState.counter + 1,
          maxSpeed
        }))
      },
      error => console.error(error),
      {
        // does not work on emulator (no GPS available)
        enableHighAccuracy: true,
        distanceFilter: 0
      }
    )
  }
*/

export { GeolocationService }
