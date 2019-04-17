import React from 'react'
import { connect } from 'react-redux'

import pino from 'pino'
import { updateGeolocation } from '../../actions/geolocation'

type Props = {
  updateGeolocation
}

type ComponentState = {}
class GeolocationService extends React.Component<Props, ComponentState> {

  constructor(props) {
    super(props)
  }

  render() {
    return null
  }

  componentDidMount() {
    this.startWatchPosition()
  }

  startWatchPosition(): void {
    // optional: get initial position, TODO: check if needed
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
        // NOTE: "true" does not work on emulator (no GPS available)
        enableHighAccuracy: true,
        distanceFilter: 0
      }
    )
  }

  handlePositionUpdate(position) {
    this.props.updateGeolocation(position)
  }

  handlePositionError(error) {
    console.warn(error)
  }
}

const mapDispatchToProps = {
  updateGeolocation
}

export default connect(null, mapDispatchToProps)(GeolocationService)
