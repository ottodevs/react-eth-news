import _ from 'lodash';
import * as types from './actionTypes';
import * as tokenStatsService from '../../services/tokenStats';

export function fetchTokenStats() {
  return async(dispatch, getState) => {
    const tokensByTicker = await tokenStatsService.getTokenStats()
    try {
      dispatch({ type: types.TOKEN_STATS_FETCHED, tokensByTicker });
    } catch(error) {
      console.log(error)
    }
  }
}
