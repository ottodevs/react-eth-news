import * as types from './actionTypes';
import {getArticlesCountAfterFilter} from '../articles/reducer';

export function changePage(newPage) {
  return ({
    type: types.PAGE_CHANGED,
    page: newPage
  })
}

export function updatePageCount(numArticles) {
  return (dispatch, getState) => {
    if (!numArticles) {
      numArticles = getArticlesCountAfterFilter(getState());
    }
    return dispatch({
      type: types.PAGE_COUNT_CHANGED,
      numArticles: numArticles
    })
  }
}
