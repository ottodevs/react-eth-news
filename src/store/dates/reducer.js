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
  switch (action.type) {
    case types.DATE_RANGE_CHANGED:
      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate,
        initBy: action.initBy
      }
    case types.FOCUSED_INPUT_CHANGED:
      return {
        ...state,
        focusedInput: action.focusedInput
      }
    default:
      return state;
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
