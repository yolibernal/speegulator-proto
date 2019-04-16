/*
  TODO: types broken for sub-package /distance, see: https://github.com/Turfjs/turf/issues/1568
  replace when fixed
*/
import turfDistance from '@turf/distance'

export default class GeoUtils {

  public calculateDistance(fromPosition: number[], toPosition: number[]) {
    return turfDistance(fromPosition, toPosition, { units: 'kilometers' })
  }
}
