import _ from 'lodash';
import * as types from './actionTypes';

export function changeDateRange(newDateRange, initBy) {
  return ({
    type: types.DATE_RANGE_CHANGED,
    startDate: newDateRange.startDate,
    endDate: newDateRange.endDate,
    initBy: initBy
  })
}

export function changeFocusedInput(newFocusedInput) {
  return ({
    type: types.FOCUSED_INPUT_CHANGED,
    focusedInput: newFocusedInput
  })
}
