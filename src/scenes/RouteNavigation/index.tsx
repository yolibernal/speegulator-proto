import { connect } from 'react-redux'
import React from 'react'
import { StateType } from '../../reducers'
import { View, Text, Image } from 'react-native'
import styles from './styles'
import NavigationBanner from './components/NavigationBanner'
import NavigationMap from './components/NavigationMap'
import { getDistanceToNextManeuver, getRouteProgress } from '../../reducers/selectors'
import { Feature, Point, FeatureCollection } from '@turf/helpers'
import { Maneuver, getNextManeuver, getHasArrived } from '../../reducers/maps'
import { getDisplay } from '../../reducers/settings'
import isEqual from 'lodash.isequal'
import { Display } from '../../services/display/Display'
import { FetchingIndicator } from './components/FetchingIndicator'
import configs from '../../../configs'
import { startNextNavigationStep } from '../../actions/maps'

type Props = {
  isFetching: boolean,
  currentPosition: Feature<Point> | null
  currentSpeed: number
  routeGeometry,
  nextManeuver: Maneuver | null
  distanceToNextManeuver: number
  routeProgress: {
    position
    geometry
  } | null
  display: Display
  desiredSpeed: number
  desiredSpeedMargin: number
  startNextNavigationStep
  hasArrived: boolean
  routeWaypoints: FeatureCollection<Point>
}

type ComponentState = {}

class RouteNavigation extends React.Component<Props, ComponentState> {
  static navigationOptions = {}

  constructor(props) {
    super(props)

    this.state = {
      distanceToNextManeuver: 9999,
      nextManeuver: {
        type: 'TYPE',
        modifier: 'MODIFIER',
        instruction: 'INSTRUCTION',
        voiceInstructions: {
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
    const { hasArrived } = this.props
    if (hasArrived) return this.renderArrived()

    const { isFetching } = this.props
    if (isFetching) return this.renderFetching()

    const { routeGeometry } = this.props
    if (!routeGeometry) return this.renderNoRoute()

    const { distanceToNextManeuver, nextManeuver, routeProgress, routeWaypoints, currentSpeed } = this.props

    // TODO: This is sometimes true on non-emulator => fix!
    if (!nextManeuver || !routeProgress) return this.renderPropertiesMissing({ nextManeuver, routeProgress })

    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <NavigationBanner
            distanceToNextManeuver={distanceToNextManeuver}
            maneuver={nextManeuver}
            currentSpeed={currentSpeed}
          />
        </View>
        <NavigationMap
          routeWaypoints={routeWaypoints}
          currentRoutePosition={routeProgress.position}
          routeGeometry={routeGeometry}
          progressGeometry={routeProgress.geometry}
          nextManeuverPosition={nextManeuver.position}
        />
      </View>
    )
  }

  renderFetching() {
    return (
      <View style={styles.container}>
        <FetchingIndicator />
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

  renderPropertiesMissing({ ...args }) {
    console.warn('Properties missing:\n')
    Object.keys(args).forEach(key => console.warn(`${key}: ${!!args[key]}\n`))
    return (
      <View>
        <Text>Required navigation properties are missing :(</Text>
      </View>
    )
  }

  renderArrived() {
    return (
      <View style={styles.containerCentered}>
        <View style={styles.arrivedContainer}>
          <Image source={require('../../../assets/arrived_green.png')} style={styles.arrivedImage} />
          <Text style={styles.centeredText}>You have arrived!</Text>
        </View>
      </View>
    )
  }

  async componentDidUpdate(prevProps: Props) {
    const { display } = this.props
    if (!isEqual(prevProps.nextManeuver, this.props.nextManeuver)) {
      const options = {
        ...prevProps.nextManeuver
      }
      await display.maneuver(options)
    }

    // TODO: to reducer?
    const { currentSpeed, desiredSpeed, desiredSpeedMargin } = this.props
    if (desiredSpeed > 0) {
      if (currentSpeed < (desiredSpeed - desiredSpeedMargin)) {
        await display.displayIncreaseSpeed()
      }
      if (currentSpeed > (desiredSpeed + desiredSpeedMargin)) {
        await display.displayDecreaseSpeed()
      }
    }

    const { distanceToNextManeuver } = this.props
    if (distanceToNextManeuver !== -1 && distanceToNextManeuver < configs.maps.nextStepDistanceThreshold) {
      this.props.startNextNavigationStep()
    }
  }
}

const mapStateToProps = (state: StateType) => {
  const { position: currentPosition, speed: currentSpeed } = state.geolocation
  const { isFetching } = state.maps.directions
  const { directions } = state.maps
  const { routeGeometry } = directions
  const { desiredSpeed, desiredSpeedMargin } = state.settings
  const { routeWaypoints } = state.maps

  const nextManeuver = getNextManeuver(state)
  const distanceToNextManeuver = getDistanceToNextManeuver(state)
  const routeProgress = getRouteProgress(state)

  const display = getDisplay(state)

  const hasArrived = getHasArrived(state)

  return {
    isFetching,
    currentPosition,
    currentSpeed,
    desiredSpeed,
    desiredSpeedMargin,
    routeWaypoints,
    routeGeometry,
    nextManeuver,
    distanceToNextManeuver,
    routeProgress,
    display,
    hasArrived
  }
}
const mapDispatchToProps = { startNextNavigationStep }

export default connect(mapStateToProps, mapDispatchToProps)(RouteNavigation)
