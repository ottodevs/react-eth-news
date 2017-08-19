import _ from 'lodash';
import * as types from './actionTypes';

export function getSources(articlesById) {
  return (dispatch, getState) => {
    // TC: use selector here?
    articlesById = articlesById || getState().articles.articlesById;
    const currentSourceType = getState().sourceTypes.currentSourceType;
    const sources = _.values(articlesById).filter(article => {
      if (currentSourceType === 'all') return true;
      else return article.type === currentSourceType;
    }).map(article => ({ source: article.source }));
    const updatedSources = _.countBy(sources, 'source');
    const sorted = _.chain(updatedSources).
      map(function(cnt, source) {
        return {
          source: source,
          count: cnt
        }
      }).sortBy('count')
      .reverse()
      .value();
    return dispatch({ type: types.SOURCES_UPDATED, sources: sorted })
  }

}
