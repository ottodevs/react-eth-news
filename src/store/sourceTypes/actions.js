import _ from 'lodash';
import * as types from './actionTypes';

export function changeSourceType(newSourceType) {
  return ({type: types.SOURCE_TYPE_CHANGED, sourceType: newSourceType})
}
