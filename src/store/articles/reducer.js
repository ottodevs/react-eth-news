import _ from 'lodash';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as types from './actionTypes';
import Immutable from 'seamless-immutable';
import * as sourceTypesSelectors from '../sourceTypes/reducer';
import * as datesSelectors from '../dates/reducer';
const moment = extendMoment(Moment);

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
    moment('Aug 08, 2017', 'MMM DD, YYYY')
   */
  const currentSourceType = sourceTypesSelectors.getCurrentSourceType(state);
  const currentDateRange = datesSelectors.getCurrentDateRange(state)
  const articlesById = state.articles.articlesById;
  const filterBySourceTypeBound = filterBySourceType.bind(null, currentSourceType, articlesById);
  const filterByDateBound = filterByDate.bind(null, currentDateRange, articlesById);
  const filters = _.flow([filterBySourceTypeBound, filterByDateBound]);
  const articlesIdArray = filters(_.keys(articlesById))
  return [articlesById, articlesIdArray];
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
