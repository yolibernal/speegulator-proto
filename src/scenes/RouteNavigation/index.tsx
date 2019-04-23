import { connect } from 'react-redux'
import React from 'react'
import { StateType } from '../../reducers'
import { View, Text } from 'react-native'
import styles from './styles'
import NavigationBanner from './components/NavigationBanner'
import Position from '../../services/geolocation/Position'
import NavigationMap from './components/NavigationMap'
import { getDistanceToNextManeuver, getRouteProgress, getNextManeuver, Maneuver } from '../../reducers/selectors'

type Props = {
  isFetching: boolean,
  currentPosition: Position,
  routeGeometry,
  nextManeuver: Maneuver,
  distanceToNextManeuver: number,
  routeProgress: {
    position,
    geometry
  }
}

type ComponentState = {}

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
    const { isFetching } = this.props
    if (isFetching) return this.renderFetching()

    const { routeGeometry } = this.props
    if (!routeGeometry) return this.renderNoRoute()

    const { distanceToNextManeuver, nextManeuver, routeProgress } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <NavigationBanner distanceToNextManeuver={distanceToNextManeuver} maneuver={nextManeuver} />
        </View>
        <NavigationMap currentRoutePosition={routeProgress.position} routeGeometry={routeGeometry} progressGeometry={routeProgress.geometry} />
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

const mapStateToProps = (state: StateType) => {
  const { position: currentPosition } = state.geolocation
  const { isFetching } = state.maps.directions
  const { directions } = state.maps
  const { routeGeometry } = directions

  const nextManeuver = getNextManeuver(state)
  const distanceToNextManeuver = getDistanceToNextManeuver(state)
  const routeProgress = getRouteProgress(state)

  return {
    isFetching,
    currentPosition,
    routeGeometry,
    nextManeuver,
    distanceToNextManeuver,
    routeProgress
  }
}
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(RouteNavigation)
