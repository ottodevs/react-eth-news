import _ from 'lodash';
import * as types from './actionTypes';
import * as articleService from '../../services/articles';
import * as paginationActions from '../pagination/actions';
import * as sourcesActions from '../sources/actions';

export function fetchArticles() {
  return async(dispatch, getState) => {
    try {
      const state = getState();
      const articles = await articleService.getAllArticles(
        state.dates.startDate, state.dates.endDate);
      const articlesById = _.keyBy(articles
        .map(article => _.assignIn({ date: article.date.trim() }, article)),
        'id');
      dispatch({ type: types.ARTICLES_FETCHED, articlesById });
      dispatch(sourcesActions.getSources(articlesById));
      dispatch(paginationActions.updatePageCount(articles.length));
    } catch (error) {
      console.error(error);
    }
  }
}
