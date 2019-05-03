import React from 'react'
import { View, Text } from 'react-native'
import { RadioButton } from 'react-native-paper'
import styles from './styles'

interface Props {
  label: string
  value: string
}

export const RadioButtonItem = (props: Props) => {
  return (
    <View style={styles.row}>
      <RadioButton value={props.value} />
      <Text style={styles.label}>{props.label}</Text>
    </View>
  )
}
