import { DisplayType } from '../services/display/DisplayType'

export const CHANGE_DISPLAY_TYPE = 'CHANGE_DISPLAY_TYPE'
export const changeDisplayType = (displayType: DisplayType) => ({
  type: CHANGE_DISPLAY_TYPE,
  displayType
})

export const SET_DESIRED_SPEED = 'SET_DESIRED_SPEED'
export const setDesiredSpeed = (desiredSpeed: number) => ({
  type: SET_DESIRED_SPEED,
  desiredSpeed
})

export const SET_DESIRED_SPEED_MARGIN = 'SET_DESIRED_SPEED_MARGIN'
export const setDesiredSpeedMargin = (desiredSpeedMargin: number) => ({
  type: SET_DESIRED_SPEED_MARGIN,
  desiredSpeedMargin
})

export const SET_SERVICE_UUID = 'SET_SERVICE_UUID'
export const setServiceUuid = (serviceUuid: string) => ({
  type: SET_SERVICE_UUID,
  serviceUuid
})

export const SET_CHARACTERISTIC_UUID = 'SET_CHARACTERISTIC_UUID'
export const setCharacteristicUuid = (characteristicUuid: string) => ({
  type: SET_CHARACTERISTIC_UUID,
  characteristicUuid
})

export const SET_IS_DEMO_MODE = 'SET_IS_DEMO_MODE'
export const setIsDemoMode = (isDemoMode: boolean) => ({
  type: SET_IS_DEMO_MODE,
  isDemoMode
})
