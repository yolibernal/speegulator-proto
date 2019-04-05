import { connect } from 'react-redux'
import React from 'react'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import { View, Text, StyleSheet } from 'react-native'

type Props = {
}

type ComponentState = {
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

class RouteMap extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'RouteMap'
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <MapboxGL.MapView
          showUserLocation={true}
          zoomLevel={12}
          userTrackingMode={MapboxGL.UserTrackingModes.Follow}
          styleURL={MapboxGL.StyleURL.Street}
          style={styles.container}
        />
      </View>
    )
  }
}

export default connect(null, null)(RouteMap)
