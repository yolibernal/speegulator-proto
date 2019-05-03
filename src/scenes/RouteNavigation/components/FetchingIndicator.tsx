import React from 'react'

import { View, Text } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import styles from './styles'

export const FetchingIndicator = () => {
  return (
      <View style={styles.fetchingIndicatorContainer}>
        <ActivityIndicator
          size={100}
          style={styles.fetchingIndicator}
        />
        <Text style={styles.fetchingIndicatorLabel}>Fetching directions...</Text>
      </View>
  )
}
