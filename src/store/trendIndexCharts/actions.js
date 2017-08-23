import _ from 'lodash';
import * as types from './actionTypes';
import googleTrendsActions from '../googleTrends/actions';
import pricesActions from '../prices/actions';
import { capitalizeFirstLetter } from '../../utils'

export function updateChartInterval(currency, interval) {
  return (dispatch, getState) => {
    dispatch({
      type: 'trendIndexCharts.CHART_INTERVAL_UPDATED',
      currency: currency,
      interval: interval
    })
    if (interval === '3M') {
        const priceFn = `fetch${capitalizeFirstLetter(currency)}UsdDaily`
        const trendFn = `fetch${capitalizeFirstLetter(currency)}GoogleTrendsDaily`
        dispatch(pricesActions[priceFn]())
        dispatch(googleTrendsActions[trendFn]())
    } else {
        const priceFn = `fetch${capitalizeFirstLetter(currency)}UsdOverTime`
        const trendFn = `fetch${capitalizeFirstLetter(currency)}GoogleTrendsOverTime`
        dispatch(pricesActions[priceFn]())
        dispatch(googleTrendsActions[trendFn]())
    }
  }

}
