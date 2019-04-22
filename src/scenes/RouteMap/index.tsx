import { connect } from 'react-redux'
import React from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { View, Text } from 'react-native'
import styles from './styles'
import { Button } from 'react-native-elements'
import { selectRoute, fetchDirections } from '../../actions/maps'
import * as turfHelpers from '@turf/helpers'
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
  // TODO: replace selectedWaypoints with feature collection? (features also contain coordinates)
  selectedWaypoints: number[][],
  featureCollection: turfHelpers.FeatureCollection
}

class RouteMap extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'RouteMap'
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedWaypoints: [],
      featureCollection: MapboxGL.geoUtils.makeFeatureCollection()
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
            shape={this.state.featureCollection}
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
            {this.state.selectedWaypoints}
          </Text>
          <Button title="Select Route" onPress={() => this.handleSelectRoute()} />
        </View>
      </View>
    )
  }

  onMapPress(event) {
    const { coordinates: waypointCoordinates } = event.geometry
    // add feature to map, see https://github.com/nitaliano/react-native-mapbox-gl/blob/master/example/src/components/CustomIcon.js
    const feature = turfHelpers.feature(event.geometry, {
      waypointNumber: this.state.featureCollection.features.length + 1
    })
    feature.id = `${Date.now()}`

    this.setState(state => ({
      selectedWaypoints: [...state.selectedWaypoints, waypointCoordinates],
      featureCollection: MapboxGL.geoUtils.addToFeatureCollection(
        this.state.featureCollection,
        feature
      )
    })
    )
  }

  onSourceLayerPress(event) {
    const feature = event.nativeEvent.payload
    console.log('You pressed a layer here is your feature', feature)
  }

  handleSelectRoute() {
    const selectedWaypoints = this.state.selectedWaypoints
    this.props.selectRoute(selectedWaypoints)
    this.props.fetchDirections(selectedWaypoints)
    this.setState(() => ({
      selectedWaypoints: []
    }))
    this.props.navigation.navigate('RouteNavigation')
  }
}

const mapDispatchToProps = { selectRoute, fetchDirections }
export default connect(null, mapDispatchToProps)(RouteMap)
