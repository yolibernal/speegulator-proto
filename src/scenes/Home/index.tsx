import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, Alert, AlertAndroid, GeolocationReturnType } from 'react-native'

interface Props { }
class Home extends Component<Props, { speed: any, counter: number, maxSpeed: number }> {
  static navigationOptions = {
    title: 'Welcome',
  }

  constructor(props: Props) {
    super(props)

    this.state = {
      speed: -1,
      counter: 0,
      maxSpeed: -1
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.tsx</Text>
        <Text>Speed: {JSON.stringify(this.state.speed)}</Text>
        <Text>Counter: {JSON.stringify(this.state.counter)}</Text>
        <Text>Max Speed: {JSON.stringify(this.state.maxSpeed)}</Text>
      </View>
    )
  }

  componentDidMount() {
    navigator.geolocation.watchPosition(
      (position) => {
        const maxSpeed = Math.max(this.state.speed, position.coords.speed || 0)
        this.setState(prevState => ({
          speed: position.coords.speed,
          counter: prevState.counter + 1,
          maxSpeed
        }))
      },
      error => console.error(error),
      {
        // does not work on emulator (no GPS available)
        enableHighAccuracy: true,
        distanceFilter: 0
      }
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

export { Home }
