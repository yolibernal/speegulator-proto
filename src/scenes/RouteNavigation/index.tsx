import { connect } from 'react-redux'
import React from 'react'
import { StateType } from '../../reducers'
import { View, Text, GeolocationReturnType } from 'react-native'
import styles from './styles'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import NavigationBanner from './components/NavigationBanner'
import GeoUtils from './services/GeoUtils'
import configs from '../../../configs'
import { startNextNavigationStep } from '../../actions/maps'
import Position from '../../services/geolocation/Position'

type Props = {
  isFetching,
  startNextNavigationStep,
  route,
  routeGeometry,
  currentNavigationStep,
  currentPosition: Position
}

const layerStyles = MapboxGL.StyleSheet.create({
  route: {
    lineColor: 'red',
    lineWidth: 3,
    lineOpacity: 0.84,
  }
})

type ComponentState = {}

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

    const { route, routeGeometry } = this.props
    if (!route) return this.renderNoRoute()

    const { currentPosition, currentNavigationStep } = this.props
    const distanceToNextManeuver = this.calculateDistanceToNextManeuver(currentPosition, currentNavigationStep)
    const nextManeuverType = currentNavigationStep.maneuver.type

    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <NavigationBanner distanceToNextManeuver={distanceToNextManeuver} maneuverType={nextManeuverType} />
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

  componentDidMount() {
    this.startNextStepWhenNearStepLocation()
  }

  componentDidUpdate() {
    this.startNextStepWhenNearStepLocation()
  }

  private calculateDistanceToNextManeuver(currentPosition, currentNavigationStep) {
    const { maneuver } = currentNavigationStep

    let distanceToNextManeuver

    const [maneuverLongitude, maneuverLatitude] = maneuver.location
    distanceToNextManeuver = GeoUtils.calculateDistance(currentPosition, { longitude: maneuverLongitude, latitude: maneuverLatitude })

    return distanceToNextManeuver
  }

  private startNextStepWhenNearStepLocation() {
    // TODO: distanceToNextManeuver to state? (maybe as PureComponent), see https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization
    const { currentPosition, currentNavigationStep } = this.props
    const distanceToNextManeuver = this.calculateDistanceToNextManeuver(currentPosition, currentNavigationStep)
    if (distanceToNextManeuver < configs.maps.nextStepDistanceThreshold) {
      this.props.startNextNavigationStep()
    }
  }
}

const mapStateToProps = (state: StateType) => {
  const { directions } = state.maps
  const { route, routeGeometry, navigationSteps, currentNavigationStepIndex } = directions
  const currentNavigationStep = navigationSteps ? navigationSteps[currentNavigationStepIndex] : null
  return {
    currentPosition: state.geolocation.position,
    isFetching: state.maps.directions.isFetching,
    route,
    routeGeometry,
    currentNavigationStep
  }
}
const mapDispatchToProps = { startNextNavigationStep }

export default connect(mapStateToProps, mapDispatchToProps)(RouteNavigation)
