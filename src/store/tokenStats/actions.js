import _ from 'lodash';
import * as types from './actionTypes';
import * as tokenStatsService from '../../services/tokenStats';
import * as trendIndexChartsTypes from '../trendIndexCharts/actionTypes'

export function fetchTokenStats() {
  return async(dispatch, getState) => {
    try {
      const tokensByTicker = await tokenStatsService.getTokenStats()
      dispatch({ type: types.TOKEN_STATS_FETCHED, tokensByTicker });
      dispatch({ type: trendIndexChartsTypes.TOP_CURRENCIES_RECEIVED, currencies: _.keyBy(tokensByTicker, 'ticker') });
    } catch (error) {
      dispatch({ type: types.TOKEN_STATS_FETCHED_IN_ERROR, message: `Sorry, we're having trouble accessing google trends. CryptoCurrent will be back online shortly. ` })
    }
  }
}
