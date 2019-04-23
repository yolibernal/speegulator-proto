import { connect } from 'react-redux'
import React from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { View, Text } from 'react-native'
import styles from './styles'
import { Button } from 'react-native-elements'
import { selectRoute, fetchDirections } from '../../actions/maps'
import * as turfHelpers from '@turf/helpers'
import { getGeom } from '@turf/invariant'
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
  icon: {
    iconAllowOverlap: true,
    iconIgnorePlacement: true,
    iconSize: 1,
    iconOffset: [0, 5],
    textField: '{waypointNumber}',
    textSize: 14
  }
})

type Props = {
  navigation,
  selectRoute,
  fetchDirections
}

type ComponentState = {
  selectedWaypoints: turfHelpers.FeatureCollection<turfHelpers.Point>
}

class RouteMap extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'RouteMap'
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedWaypoints: turfHelpers.featureCollection([])
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          showUserLocation={true}
          zoomLevel={12}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={MapboxGL.StyleURL.Street}
          style={styles.map}
          onPress={event => this.onMapPress(event)}
        >
          <MapboxGL.ShapeSource
            id="symbolLocationSource"
            hitbox={{ width: 20, height: 20 }}
            onPress={this.onSourceLayerPress}
            shape={this.state.selectedWaypoints}
          >
            <MapboxGL.SymbolLayer
              id="symbolLocationSymbols"
              minZoomLevel={1}
              style={mglStyles.icon}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
        <View style={styles.footer}>
          <Text>
            Selected waypoints:
            {this.state.selectedWaypoints.features.map(feature => getGeom(feature).coordinates)}
          </Text>
          <Button title="Select Route" onPress={() => this.handleSelectRoute()} />
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
    // TODO: combine selectRoute and fetchDirections?
    this.props.selectRoute(selectedWaypoints)
    this.props.fetchDirections(selectedWaypoints)
    this.setState(() => ({
      selectedWaypoints: turfHelpers.featureCollection([])
    }))
    this.props.navigation.navigate('RouteNavigation')
  }
}

const mapDispatchToProps = { selectRoute, fetchDirections }
export default connect(null, mapDispatchToProps)(RouteMap)
