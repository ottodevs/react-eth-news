import _ from 'lodash';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import * as sourceTypesSelectors from '../sourceTypes/reducer';

const initialState = Immutable({
  articlesById: undefined,
})

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.ARTICLES_FETCHED:
      return state.merge({
        articlesById: action.articlesById
      });
    default:
      return state;
  }
}

export function getArticles(state) {
  /**
    currently we only have source type as filter
    but articles can be cross filtered
   */
  const currentSourceType = sourceTypesSelectors.getCurrentSourceType(state);
  const articlesById = state.articles.articlesById;
  const articlesIdArray = currentSourceType === 'all' ? _.keys(articlesById) : _.filter(_.keys(articlesById), articleId => articlesById[articleId].type === currentSourceType);
  return [articlesById, articlesIdArray];
}

