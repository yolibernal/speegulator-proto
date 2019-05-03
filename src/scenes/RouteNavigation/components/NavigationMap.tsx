import { connect } from 'react-redux'
import MapboxGL from '@mapbox/react-native-mapbox-gl'

import React from 'react'
import { StateType } from '../../../reducers'
import styles from '../styles'
import theme from '../../../theme'
import { Point, Feature } from '@turf/helpers'

type Props = {
  routeGeometry
  progressGeometry
  currentRoutePosition
  routeWaypoints
  nextManeuverPosition: Feature<Point>
}

type ComponentState = {}

const layerStyles = MapboxGL.StyleSheet.create({
  route: {
    lineColor: theme.colors.accent,
    lineWidth: 3,
    lineOpacity: 0.84
  },
  routeProgress: {
    lineColor: theme.colors.primary,
    lineWidth: 5,
    lineOpacity: 0.84
  }
})

const mglStyles = MapboxGL.StyleSheet.create({
  routePositionCircle: {
    circleRadius: 5,
    circleColor: theme.colors.primary
  },
  waypointCircle: {
    circleRadius: 5,
    circleColor: theme.colors.primary
  },
  nextManuverPositionCircle: {
    circleRadius: 7,
    circleColor: theme.colors.accent
  }
})

class NavigationMap extends React.PureComponent<Props, ComponentState> {

  constructor(props) {
    super(props)
  }

  render() {
    const { routeGeometry, progressGeometry, routeWaypoints, nextManeuverPosition } = this.props
    return (
      <MapboxGL.MapView
        showUserLocation={true}
        zoomLevel={15}
        userTrackingMode={MapboxGL.UserTrackingModes.Follow}
        styleURL={MapboxGL.StyleURL.Street}
        style={styles.map}
      >
        {this.renderRoute(routeGeometry)}
        {this.renderRouteProgress(progressGeometry)}
        {this.renderWaypoints(routeWaypoints)}
        {this.renderNextManeuverPosition(nextManeuverPosition)}
        {this.renderRoutePosition()}
      </MapboxGL.MapView>
    )
  }

  renderWaypoints(routeWaypoints) {
    return (
      <MapboxGL.ShapeSource
        id={'waypointSource'}
        hitbox={{ width: 20, height: 20 }}
        shape={routeWaypoints}
      >
        <MapboxGL.CircleLayer
          id={'waypointCircleLayer'}
          style={mglStyles.waypointCircle}
        />
      </MapboxGL.ShapeSource>
    )
  }

  renderNextManeuverPosition(nextManeuverPosition) {
    return (
      <MapboxGL.ShapeSource
        id={'maneuverPositionSource'}
        hitbox={{ width: 20, height: 20 }}
        shape={nextManeuverPosition}
      >
        <MapboxGL.CircleLayer
          id={'maneuverPositionCircleLayer'}
          style={mglStyles.nextManuverPositionCircle}
        />
      </MapboxGL.ShapeSource>
    )
  }

  renderRoute(routeGeometry) {
    if (!routeGeometry) return null

    return (
      <MapboxGL.ShapeSource id="routeSource" shape={routeGeometry}>
        <MapboxGL.LineLayer
          id="routeFill"
          style={layerStyles.route}
        />
      </MapboxGL.ShapeSource>
    )
  }

  renderRouteProgress(routeProgressGeometry) {
    if (!routeProgressGeometry) return null

    return (
      <MapboxGL.ShapeSource id="routeProgressSource" shape={routeProgressGeometry}>
        <MapboxGL.LineLayer
          id="routeProgressFill"
          style={layerStyles.routeProgress}
        />
      </MapboxGL.ShapeSource>
    )
  }

  renderRoutePosition() {
    const { currentRoutePosition } = this.props

    if (!currentRoutePosition) return null

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
