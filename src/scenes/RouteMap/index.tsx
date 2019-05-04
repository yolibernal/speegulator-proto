import { connect } from 'react-redux'
import React from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { View, Text } from 'react-native'
import styles from './styles'
import { Button, Checkbox } from 'react-native-paper'
import { selectRoute, fetchDirections } from '../../actions/maps'
import * as turfHelpers from '@turf/helpers'
import theme from '../../theme'
import { NavigationScreenProps, NavigationScreenOptions } from 'react-navigation'
import { StateType } from '../../reducers'
// import locationIcon from '../../assets/location_icon.png'
/*
event example
{
  properties: { screenPointY: 501.328125, screenPointX: 333.28125 },
  geometry:
  {
    coordinates: [-122.09748154853304, 37.43706374560975],
      type: 'Point'
  },
  type: 'Feature'
}
*/

const mglStyles = MapboxGL.StyleSheet.create({
  waypointIcon: {
    iconAllowOverlap: true,
    iconIgnorePlacement: true,
    iconSize: 1,
    iconOffset: [0, 5],
    textField: '{waypointNumber}',
    textSize: 14,
    textColor: 'white'
  },
  waypointCircle: {
    circleRadius: 10,
    circleColor: theme.colors.primary
  }
})

interface Props extends NavigationScreenProps {
  navigation,
  selectRoute,
  fetchDirections
  currentPosition: turfHelpers.Feature<turfHelpers.Point>
}

type ComponentState = {
  selectedWaypoints: turfHelpers.FeatureCollection<turfHelpers.Point>
  startFromCurrentPosition: boolean
}

class RouteMap extends React.Component<Props, ComponentState> {
  static navigationOptions = ({ navigation }: NavigationScreenProps): NavigationScreenOptions => ({
    headerRight: (
      <View style={styles.row}>
        <Text style={styles.label}>Start from current position</Text>
        <Checkbox
          onPress={navigation.getParam('toggleStartFromCurrentPosition')}
          status={navigation.getParam('startFromCurrentPosition') ? 'checked' : 'unchecked'}
        />
      </View>
    )
  })

  constructor(props) {
    super(props)
    this.state = {
      selectedWaypoints: turfHelpers.featureCollection([]),
      startFromCurrentPosition: true
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      startFromCurrentPosition: this.state.startFromCurrentPosition,
      toggleStartFromCurrentPosition: () => {
        this.setState((state) => {
          const newState = { startFromCurrentPosition: !state.startFromCurrentPosition }
          this.props.navigation.setParams(newState)
          return newState
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          showUserLocation={true}
          zoomLevel={15}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={MapboxGL.StyleURL.Street}
          style={styles.map}
          onPress={event => this.onMapPress(event)}
        >
          <MapboxGL.ShapeSource
            id={'waypointSource'}
            hitbox={{ width: 20, height: 20 }}
            onPress={this.onSourceLayerPress}
            shape={this.state.selectedWaypoints}
          >
            <MapboxGL.SymbolLayer
              id={'waypointSymbolLayer'}
              minZoomLevel={1}
              style={mglStyles.waypointIcon}
            />
            <MapboxGL.CircleLayer
              id={'waypointCircleLayer'}
              belowLayerID={'waypointSymbolLayer'}
              style={mglStyles.waypointCircle}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
        <View style={styles.footer}>
          <Button
            disabled={ this.state.selectedWaypoints.features.length < (this.state.startFromCurrentPosition ? 1 : 2) }
            onPress={() => this.handleSelectRoute()}
          >
            Start navigation
          </Button>
        </View>
      </View>
    )
  }

  onMapPress(event) {
    // add feature to map, see https://github.com/nitaliano/react-native-mapbox-gl/blob/master/example/src/components/CustomIcon.js
    const waypoint = turfHelpers.feature(event.geometry, {
      waypointNumber: this.state.selectedWaypoints.features.length + 1
    })
    waypoint.id = `${Date.now()}`

    this.setState((state) => {
      const selectedWaypointsCopy = Object.assign({}, state.selectedWaypoints)
      selectedWaypointsCopy.features.push(waypoint)
      return {
        selectedWaypoints: selectedWaypointsCopy
      }
    })
  }

  onSourceLayerPress(event) {
    const feature = event.nativeEvent.payload
    console.log('You pressed a layer here is your feature', feature)
  }

  handleSelectRoute() {
    const { selectedWaypoints } = this.state

    let waypointsForNavigation: turfHelpers.FeatureCollection<turfHelpers.Point>
    if (this.state.startFromCurrentPosition) {
      const selectedWaypointsCopy = Object.assign({}, this.state.selectedWaypoints)
      const { currentPosition } = this.props
      selectedWaypointsCopy.features.unshift(currentPosition)
      waypointsForNavigation = selectedWaypointsCopy
    } else {
      waypointsForNavigation = selectedWaypoints
    }
    // TODO: combine selectRoute and fetchDirections?
    this.props.selectRoute(waypointsForNavigation)
    this.props.fetchDirections(waypointsForNavigation)
    this.setState(() => ({
      selectedWaypoints: turfHelpers.featureCollection([])
    }))
    this.props.navigation.navigate('RouteNavigation')
  }
}

const mapStateToProps = (state: StateType) => ({ currentPosition: state.geolocation.position })
const mapDispatchToProps = { selectRoute, fetchDirections }
export default connect(mapStateToProps, mapDispatchToProps)(RouteMap)
