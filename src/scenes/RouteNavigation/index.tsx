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
import lineSlice from '@turf/line-slice'
import * as turfInvariant from '@turf/invariant'
import isEqual from 'lodash.isequal'

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
  nextManeuver: {
    // tslint:disable-next-line: no-reserved-keywords
    type: string,
    modifier: string,
    instruction: string,
    voiceInstructions: {
      distanceAlongGeometry: number,
      announcement: string,
      ssmlAnnouncement: string
    }
  },
  currentRoutePosition,
  progressGeometry
}

class RouteNavigation extends React.PureComponent<Props, ComponentState> {
  static navigationOptions = {
    title: 'RouteNavigation'
  }

  constructor(props) {
    super(props)

    this.state = {
      distanceToNextManeuver: 9999,
      nextManeuver: {
        type: 'TYPE',
        modifier: 'MODIFIER',
        instruction: 'INSTRUCTION',
        voiceInstructions:{
          distanceAlongGeometry: 9999,
          announcement: 'ANNOUNCEMENT',
          ssmlAnnouncement: 'SSML_ANNOUNCEMENT'
        }
      },
      currentRoutePosition: null,
      progressGeometry: null
    }
  }

  render() {
    const { isFetching } = this.props
    if (isFetching) return this.renderFetching()

    const { route, routeGeometry } = this.props
    if (!route) return this.renderNoRoute()

    const { distanceToNextManeuver, nextManeuver, currentRoutePosition, progressGeometry } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <NavigationBanner distanceToNextManeuver={distanceToNextManeuver} maneuver={nextManeuver} />
        </View>
        <NavigationMap currentRoutePosition={currentRoutePosition} routeGeometry={routeGeometry} progressGeometry={progressGeometry} />
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
    this.calculateProgress()
  }

  componentDidUpdate(prevProps: Props) {
    this.handleManuever()
    this.calculateProgress()
  }

  handleManuever() {
    const { currentPosition, currentNavigationStep } = this.props
    if (!currentPosition || !currentNavigationStep) return

    const distanceToNextManeuver = this.calculateDistanceToNextManeuver(currentPosition, currentNavigationStep)
    const { type, modifier, instruction } = currentNavigationStep.maneuver
    const { voiceInstructions, bannerInstrcutions } = currentNavigationStep
    const nextManeuver = {
      type,
      modifier,
      instruction,
      voiceInstructions: voiceInstructions[0]
    }

    if (!isEqual(this.state.nextManeuver, nextManeuver) || !(this.state.distanceToNextManeuver !== distanceToNextManeuver)) {
      this.setState({
        distanceToNextManeuver,
        nextManeuver
      })
    }

    if (distanceToNextManeuver < configs.maps.nextStepDistanceThreshold) {
      this.props.startNextNavigationStep()
    }
  }

  calculateProgress() {
    const { currentPosition, routeGeometry } = this.props
    if (!currentPosition || !routeGeometry) return

    const { longitude, latitude } = currentPosition
    // TODO: convert points/lines in state/actions etc. to GeoJSON
    const currentPositionGeoJson = turfHelpers.point([longitude, latitude])

    const currentRoutePosition = nearestPointOnLine(routeGeometry, currentPositionGeoJson)
    if (this.state.currentRoutePosition && turfEqual(currentRoutePosition, this.state.currentRoutePosition)) return
    const routeCoords = turfInvariant.getCoords(this.props.routeGeometry)
    const startingPoint = turfHelpers.point(routeCoords[0])
    // TODO: rename after GeoJSON conversion
    const progressGeometry = lineSlice(startingPoint, currentPositionGeoJson, routeGeometry)
    this.setState({
      currentRoutePosition,
      progressGeometry
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
