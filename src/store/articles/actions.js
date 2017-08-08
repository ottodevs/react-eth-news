import _ from 'lodash';
import * as types from './actionTypes';
import * as articleService from '../../services/articles'

export function fetchArticles() {
  return async dispatch => {
    try {
      const articles = await articleService.getAllArticles();
      const articlesById = _.keyBy(articles
        .map(article => _.assignIn({ date: article.date.trim() }, article)),
        'id');
      dispatch({ type: types.ARTICLES_FETCHED, articlesById })
    } catch (error) {
      console.error(error)
    }
  }
}
