import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  currentSourceType: 'all',
  sourceTypes: [{
    id: 'all',
    name: 'all',
    classModifier: 'default'
  }, {
    id: 'msm',
    name: 'mainstream site',
    classModifier: 'primary'
  }, {
    id: 'crypto',
    name: 'crypto community',
    classModifier: 'info'
  }]
})

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SOURCE_TYPE_CHANGED:
      return state.merge({
        currentSourceType: action.sourceType
      });
    default:
      return state;
  }
}

export function getCurrentSourceType(state) {
  return state.sourceTypes.currentSourceType;
}

export function getSourceTypes(state) {
  return state.sourceTypes.sourceTypes;
}
