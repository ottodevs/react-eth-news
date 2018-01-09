import _ from 'lodash';
import * as types from './actionTypes';
import {
  fetchGoogleTrendsOverTimeFromTicker,
  fetchGoogleTrendsDailyFromTicker
}
from '../googleTrends/actions';
import {
  fetchUsdPriceOverTimeFromTicker,
  fetchUsdPriceDailyFromTicker
} from '../prices/actions';
import { capitalizeFirstLetter } from '../../utils'

export function updateChartInterval(currency, interval) {
  return (dispatch, getState) => {

    dispatch({
      type: 'trendIndexCharts.CHART_INTERVAL_UPDATED',
      currency: currency,
      interval: interval
    })
    if (interval === '3M') {
      dispatch(fetchUsdPriceDailyFromTicker(currency)())
      dispatch(fetchGoogleTrendsDailyFromTicker(currency)())
    } else {
      dispatch(fetchUsdPriceOverTimeFromTicker(currency)())
      dispatch(fetchGoogleTrendsOverTimeFromTicker(currency)())
    }

  }

}
