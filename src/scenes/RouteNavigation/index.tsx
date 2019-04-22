import { connect } from 'react-redux'
import React from 'react'
import { StateType } from '../../reducers'
import { View, Text } from 'react-native'
import styles from './styles'
import NavigationBanner from './components/NavigationBanner'
import GeoUtils from './services/GeoUtils'
import configs from '../../../configs'
import { startNextNavigationStep } from '../../actions/maps'
import Position from '../../services/geolocation/Position'
import NavigationMap from './components/NavigationMap'
import * as turfHelpers from '@turf/helpers'
import nearestPointOnLine from '@turf/nearest-point-on-line'
import turfEqual from '@turf/boolean-equal'

type Props = {
  isFetching,
  startNextNavigationStep,
  route,
  routeGeometry,
  currentNavigationStep,
  currentPosition: Position
}

type ComponentState = {
  distanceToNextManeuver: number,
  nextManeuverType: string,
  currentRoutePosition
}

class RouteNavigation extends React.PureComponent<Props, ComponentState> {
  static navigationOptions = {
    title: 'RouteNavigation'
  }

  constructor(props) {
    super(props)

    this.state = {
      distanceToNextManeuver: 9999,
      nextManeuverType: 'NONE',
      currentRoutePosition: null
    }
  }

  render() {
    const { isFetching } = this.props
    if (isFetching) return this.renderFetching()

    const { route, routeGeometry } = this.props
    if (!route) return this.renderNoRoute()

    const { distanceToNextManeuver, nextManeuverType, currentRoutePosition } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <NavigationBanner distanceToNextManeuver={distanceToNextManeuver} maneuverType={nextManeuverType} />
        </View>
        <NavigationMap currentRoutePosition={currentRoutePosition} routeGeometry={routeGeometry} />
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
    this.handleManuever()
    this.calculateCurrentPointOnRoute()
  }

  componentDidUpdate(prevProps: Props) {
    this.handleManuever()
    this.calculateCurrentPointOnRoute()
  }

  handleManuever() {
    const { currentPosition, currentNavigationStep } = this.props
    if (!currentPosition || !currentNavigationStep) return

    const distanceToNextManeuver = this.calculateDistanceToNextManeuver(currentPosition, currentNavigationStep)
    const nextManeuverType = currentNavigationStep.maneuver.type
    this.setState({
      distanceToNextManeuver,
      nextManeuverType
    })
    if (distanceToNextManeuver < configs.maps.nextStepDistanceThreshold) {
      this.props.startNextNavigationStep()
    }
  }

  calculateCurrentPointOnRoute() {
    const { currentPosition, routeGeometry } = this.props
    if (!currentPosition || !routeGeometry) return

    const { longitude, latitude } = currentPosition
    // TODO: convert points/lines in state/actions etc. to GeoJSON
    const currentPositionFeature = turfHelpers.feature({
      type: 'Point',
      coordinates: [longitude, latitude]
    })

    const currentRoutePosition = nearestPointOnLine(routeGeometry, currentPositionFeature)
    if (this.state.currentRoutePosition && turfEqual(currentRoutePosition, this.state.currentRoutePosition)) return
    this.setState({
      currentRoutePosition
    })
  }

  private calculateDistanceToNextManeuver(currentPosition, currentNavigationStep) {
    const { maneuver } = currentNavigationStep
    const [maneuverLongitude, maneuverLatitude] = maneuver.location
    const distanceToNextManeuver = GeoUtils.calculateDistance(currentPosition, { longitude: maneuverLongitude, latitude: maneuverLatitude })

    return distanceToNextManeuver
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
