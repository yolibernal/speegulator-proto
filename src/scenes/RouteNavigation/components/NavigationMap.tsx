import { connect } from 'react-redux'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

import React from 'react'
import { StateType } from '../../../reducers'
import styles from '../styles'

type Props = {
  routeGeometry,
  currentRoutePosition
}

type ComponentState = {}

const layerStyles = MapboxGL.StyleSheet.create({
  route: {
    lineColor: 'red',
    lineWidth: 3,
    lineOpacity: 0.84
  }
})

const mglStyles = MapboxGL.StyleSheet.create({
  routePositionCircle: {
    circleRadius: 5,
    circleColor: 'black',
    circleStrokeWidth: 1,
    circleStrokeColor: '#c6d2e1'
  }
})

class NavigationMap extends React.PureComponent<Props, ComponentState> {

  constructor(props) {
    super(props)
  }

  render() {
    const { routeGeometry } = this.props
    return (
      <MapboxGL.MapView
        showUserLocation={true}
        zoomLevel={12}
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}
        styleURL={MapboxGL.StyleURL.Street}
        style={styles.map}
      >
        <MapboxGL.ShapeSource id="routeSource" shape={routeGeometry}>
          <MapboxGL.LineLayer
            id="routeFill"
            style={layerStyles.route}
            belowLayerID="originInnerCircle"
          />
        </MapboxGL.ShapeSource>

        {this.renderRoutePosition()}
      </MapboxGL.MapView>
    )
  }

  renderRoutePosition() {
    const { currentRoutePosition } = this.props

    return (
      <MapboxGL.ShapeSource
        shape={currentRoutePosition}
        id="currentRoutePositionSource"
      >
        <MapboxGL.CircleLayer
          id="currentRoutePositionCircle"
          style={mglStyles.routePositionCircle}
        />
      </MapboxGL.ShapeSource>
    )
  }
}

const mapStateToProps = (state: StateType) => ({})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationMap)
