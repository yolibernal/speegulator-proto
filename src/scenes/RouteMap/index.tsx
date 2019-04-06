import { connect } from 'react-redux'
import React from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { View, Text } from 'react-native'
import styles from './styles'
import { Button } from 'react-native-elements'
import { selectRoute } from '../../actions/maps'
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

type Props = {
  navigation,
  selectRoute
}

type ComponentState = {
  selectedWaypoints: number[][]
}

class RouteMap extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'RouteMap'
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedWaypoints: []
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
          onPress={event => this.handleMapPress(event)}
        />
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

  handleMapPress(event) {
    const { coordinates: waypointCoordinates } = event.geometry
    this.setState(state => ({
      selectedWaypoints: [...state.selectedWaypoints, waypointCoordinates]
    }))
  }

  handleSelectRoute() {
    const selectedWaypoints = this.state.selectedWaypoints
    this.props.selectRoute(selectedWaypoints)
    this.setState(() => ({
      selectedWaypoints: []
    }))
    this.props.navigation.navigate('Home')
  }
}

const mapDispatchToProps = { selectRoute }
export default connect(null, mapDispatchToProps)(RouteMap)
