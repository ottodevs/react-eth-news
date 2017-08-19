import _ from 'lodash';
import * as types from './actionTypes';

const initialState = {
  currentSources: [],
  sources: []
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.CURRENT_SOURCES_CHANGED:
      return {...state, currentSources: action.currentSources}
    case types.SOURCES_UPDATED:
      return {...state, sources: action.sources}
    default:
      return state;
  }
}

export function getCurrentSources(state) {
  return state.sources.currentSources;
}

export function getSources(state) {
  return state.sources.sources;
}

export function getSourcesForDisplay(state) {
  return state.sources.sources.map(s => ({
    value: s.source,
    label: `${s.source} (${s.count})`
  }));
}
