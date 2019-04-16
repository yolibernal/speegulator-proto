import { connect } from 'react-redux'
import React from 'react'
import { StateType } from '../../reducers'
import { View, Text, GeolocationReturnType } from 'react-native'
import styles from './styles'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import NavigationBanner from './components/NavigationBanner'
import GeoUtils from './services/GeoUtils'

type Props = {
  isFetching,
  directions,
  currentGeolocation: GeolocationReturnType
}

const layerStyles = MapboxGL.StyleSheet.create({
  route: {
    lineColor: 'red',
    lineWidth: 3,
    lineOpacity: 0.84,
  }
})

type ComponentState = {
  route
}

class RouteNavigation extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'RouteNavigation'
  }

  constructor(props) {
    super(props)
  }

  render() {

    const { isFetching } = this.props
    if (isFetching) return this.renderFetching()

    const { route, routeGeometry, currentNavigationStepIndex, navigationSteps } = this.props.directions

    if (!route) return this.renderNoRoute()

    const currentStep = navigationSteps[currentNavigationStepIndex]
    const { maneuver } = currentStep

    let distanceToNextManeuver

    const { currentGeolocation } = this.props
    if (currentGeolocation) {
      const { longitude, latitude } = currentGeolocation.coords
      const [maneuverLongitude, maneuverLatitude] = maneuver.location
      distanceToNextManeuver = GeoUtils.calculateDistance({ longitude, latitude }, { longitude: maneuverLongitude, latitude: maneuverLatitude })
    } else {
      distanceToNextManeuver = 0
    }
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <NavigationBanner distanceToNextManeuver={distanceToNextManeuver} maneuverType={maneuver.type} />
        </View>
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
        </MapboxGL.MapView>
      </View>
    )
  }

  renderFetching() {
    return (
      <View>
        <Text>Fetching directions...</Text>
      </View>
    )
  }

  renderNoRoute() {
    return (
      <View>
        <Text>Currently no route available...</Text>
      </View>
    )
  }
}

const mapStateToProps = (state: StateType) => ({ currentGeolocation: state.geolocation, isFetching: state.maps.directions.isFetching, directions: state.maps.directions })
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RouteNavigation)
