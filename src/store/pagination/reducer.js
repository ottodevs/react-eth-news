import * as types from './actionTypes';

const initialState = {
  offset: 0,
  limit: 6,
  pageCount: 0
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.PAGE_CHANGED:
      return {
        ...state,
        offset: action.page
      }
    case types.PAGE_COUNT_CHANGED:
      return {
        ...state,
        pageCount: action.numArticles / state.limit
      }
    default:
      return state;
  }
}

export function getCurrentPage(state) {
  return [
    state.pagination.offset,
    state.pagination.limit
  ]
}

export function getPageCount(state) {
  return state.pagination.pageCount
}
