import _ from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as types from './actionTypes';
import * as sourceTypesSelectors from '../sourceTypes/reducer';
import * as datesSelectors from '../dates/reducer';
import * as ethPricesSelectors from '../ethPrices/reducer';
const moment = extendMoment(Moment);

const initialState = {
  articlesById: undefined,
}

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.ARTICLES_FETCHED:
      return { ...state, articlesById: action.articlesById }
    default:
      return state;
  }
}

export function getArticles(state) {
  /**
    currently we only have source type as filter
    but articles can be cross filtered
    moment('Aug 08, 2017', 'MMM DD, YYYY')
   */
  const currentSourceType = sourceTypesSelectors.getCurrentSourceType(state);
  const currentDateRange = datesSelectors.getCurrentDateRange(state)
  const articlesById = _.sortBy(state.articles.articlesById, [function(o) { return new Date(o.date) }]);
  const filterBySourceTypeBound = filterBySourceType.bind(null, currentSourceType, articlesById);
  const filterByDateBound = filterByDate.bind(null, currentDateRange, articlesById);
  const filters = _.flow([filterBySourceTypeBound, filterByDateBound]);
  const articlesIdArray = filters(_.keys(articlesById))
  return [articlesById, articlesIdArray];
}

export function getArticlesGroupByDate(state) {
  const sysStartDate = new Date(moment('Jul 03, 2015', 'MMM DD, YYYY'));
  const systemInterval = [2, 'days'];
  var articlesById, articlesIdArray, articlesByDate, dateKeys;
  [articlesById, articlesIdArray] = getArticles(state);
  articlesByDate = _.groupBy(_.values(articlesById), o => moment(o.date).format('YYYYMM'));
  return _.values(articlesByDate).map(articles => {
    return {
      date: moment(articles[0].date).format('YYYY-MM'),
      msm: articles.filter(a => a.type === 'msm').length,
      crypto: articles.filter(a => a.type === 'crypto').length,
      all: articles.length
    }
  }).filter(articles => articles.date !== 'Invalid date')
}

function filterBySourceType(currentSourceType, articlesById, articlesIdArray) {
  return currentSourceType === 'all' ?
    articlesIdArray :
    _.filter(articlesIdArray, articleId => articlesById[articleId].type === currentSourceType);
}

function filterByDate(currentDateRange, articlesById, articlesIdArray) {
  if (!(currentDateRange.startDate || currentDateRange.endDate)) {
    return articlesIdArray
  } else {
    const endDate = currentDateRange.endDate ?
      moment(currentDateRange.endDate, 'MMM DD, YYYY') : null;
    const startDate = currentDateRange.startDate ?
      moment(currentDateRange.startDate, 'MMM DD, YYYY') : null;
    const range = moment.range(startDate, endDate);
    return _.filter(articlesIdArray, articleId => {
      return range.contains(
        moment(articlesById[articleId].date, 'MMM DD, YYYY'), { exclusive: false })
    })
  }

}
