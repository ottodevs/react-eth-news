import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import moment from 'moment';

/**
 *  immutable doesn't work well with moment.js
 *  somehow the moment object turns into regular object
 */


const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
  initBy: null
}

export default function reduce(state = initialState, action = {}) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case types.DATE_RANGE_CHANGED:
      newState.startDate = action.startDate;
      newState.endDate = action.endDate;
      newState.initBy = action.initBy
    case types.FOCUSED_INPUT_CHANGED:
      newState.focusedInput = action.focusedInput
    default:
      return newState;
  }
}

export function getCurrentDateRange(state) {
  return {
    startDate: state.dates.startDate,
    endDate: state.dates.endDate
  }
}

export function getDateChangeInitiator(state) {
  return state.dates.initBy;
}

export function getCurrentFocusedInput(state) {
  return state.dates.focusedInput
}

