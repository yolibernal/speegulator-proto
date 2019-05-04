import { CHANGE_DISPLAY_TYPE, SET_DESIRED_SPEED, SET_DESIRED_SPEED_MARGIN, SET_SERVICE_UUID, SET_CHARACTERISTIC_UUID, SET_IS_DEMO_MODE } from '../actions/settings'
import { DisplayType } from '../services/display/DisplayType'
import { createSelector } from 'reselect'
import { StateType } from './index'
import DisplayFactory from '../services/display/DisplayFactory'

type SettingsState = {
  displayType: DisplayType
  desiredSpeed: number
  desiredSpeedMargin: number
  serviceUuid: string
  characteristicUuid: string
  isDemoMode: boolean
}

const initialState: SettingsState = {
  displayType: DisplayType.VIBRATION,
  desiredSpeed: 0,
  desiredSpeedMargin: 1,
  serviceUuid: '713d0000-503e-4c75-ba94-3148f18d941e',
  characteristicUuid: '713d0003-503e-4c75-ba94-3148f18d941e',
  isDemoMode: false
}

const settings = (state = initialState, action): SettingsState => {
  switch (action.type) {
    case CHANGE_DISPLAY_TYPE:
      return {
        ...state,
        displayType: action.displayType
      }
    case SET_DESIRED_SPEED:
      return {
        ...state,
        desiredSpeed: action.desiredSpeed
      }
    case SET_DESIRED_SPEED_MARGIN:
      return {
        ...state,
        desiredSpeedMargin: action.desiredSpeedMargin
      }
    case SET_SERVICE_UUID:
      return {
        ...state,
        serviceUuid: action.serviceUuid
      }
    case SET_CHARACTERISTIC_UUID:
      return {
        ...state,
        characteristicUuid: action.characteristicUuid
      }
    case SET_IS_DEMO_MODE:
      return {
        ...state,
        isDemoMode: action.isDemoMode
      }
    default:
      return state
  }
}

export default settings

export const getDisplayType = (state: StateType) => state.settings.displayType
export const getIsDemoMode = (state: StateType) => state.settings.isDemoMode

export const getDisplay = createSelector(
  [getDisplayType],
  (displayType) => {
    const display = DisplayFactory.createDisplay(displayType)
    return display
  }
)
