import * as types from './actionTypes';

export function changePage(newPage) {
  return ({
    type: types.PAGE_CHANGED,
    page: newPage
  })
}

export function updatePageCount(numArticles) {
  return ({
    type: types.PAGE_COUNT_CHANGED,
    numArticles: numArticles
  })
}
