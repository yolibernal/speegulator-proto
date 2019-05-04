import React from 'react'
import { View, Text } from 'react-native'
import { Switch } from 'react-native-paper'
import styles from './styles'

interface Props {
  label: string
  enabled: boolean
  onValueChange
}

export const SwitchItem = (props: Props) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{props.label}</Text>
      <Switch
        value={props.enabled}
        onValueChange={() => props.onValueChange()}
      />
    </View>
  )
}
