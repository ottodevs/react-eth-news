import _ from 'lodash';
import * as types from './actionTypes';
import * as tokenStatsService from '../../services/tokenStats';
import * as trendIndexChartsTypes from '../trendIndexCharts/actionTypes'

export function fetchTokenStats() {
  return async(dispatch, getState) => {
    const tokensByTicker = await tokenStatsService.getTokenStats()
    try {
      dispatch({ type: types.TOKEN_STATS_FETCHED, tokensByTicker });
      dispatch({ type: trendIndexChartsTypes.TOP_CURRENCIES_RECEIVED, currencies: _.keyBy(tokensByTicker, 'ticker') });
    } catch (error) {
      console.log(error)
    }
  }
}
