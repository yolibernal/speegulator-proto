import configs from '../../configs'
import { startNextNavigationStep } from '../actions/maps'

export const nextStepInitiator = store => next => (action) => {
  const { distanceToNextManeuver } = store.getState()
  if (distanceToNextManeuver < configs.maps.nextStepDistanceThreshold) {
    store.dispatch(startNextNavigationStep())
  }
  return next(action)
}
