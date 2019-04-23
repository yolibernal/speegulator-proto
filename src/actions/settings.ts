import { DisplayType } from '../services/display/DisplayType'

export const CHANGE_DISPLAY_TYPE = 'CHANGE_DISPLAY_TYPE'

export const changeDisplayType = (displayType: DisplayType) => ({
  type: CHANGE_DISPLAY_TYPE,
  displayType
})
