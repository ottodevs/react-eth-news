import _ from 'lodash';
import * as types from './actionTypes';
import * as articlesActions from '../articles/actions';

export function changeDateRange(newDateRange, initBy) {
  return (dispatch, getState) => {
    const state = getState();
    if (state.dates.startDate && state.dates.endDate
        && newDateRange.startDate.format('YYYYMMDD') === state.dates.startDate.format('YYYYMMDD')
        && newDateRange.endDate.format('YYYYMMDD') === state.dates.endDate.format('YYYYMMDD')) return
    dispatch({
      type: types.DATE_RANGE_CHANGED,
      startDate: newDateRange.startDate,
      endDate: newDateRange.endDate,
      initBy: initBy
    })
    dispatch(articlesActions.fetchArticles());
  }


}

export function changeFocusedInput(newFocusedInput) {
  return ({
    type: types.FOCUSED_INPUT_CHANGED,
    focusedInput: newFocusedInput
  })
}
