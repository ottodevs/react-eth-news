import './TrendIndex.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as trendIndexChartsActions from '../store/trendIndexCharts/actions';
import { getTokenStats } from '../store/tokenStats/reducer';
import {ListView, ListRow} from '../components';
import {
  TrendsChartWrapper,
  BtcPriceTrendChartWrapper,
  EthPriceTrendChartWrapper,
  BchPriceTrendChartWrapper,
  XrpPriceTrendChartWrapper,
  XemPriceTrendChartWrapper,
  LtcPriceTrendChartWrapper
} from './index'
import {PriceTrendChart} from '../components';
import {Link} from 'react-router-dom'


class TrendIndex extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    if (!this.props.tokensByTicker) return this.renderLoading();
    const latestGoogleTrendDataDate = this.props.tokensByTicker[this.props.tickerArray[0]] ?
      this.props.tokensByTicker[this.props.tickerArray[0]].endDate : ''
    return (
      <div className="TrendIndex">
        <section className="header-section container">
          <header className="row justify-content-center">
            <h4 className="col-md-12">
              <span>Google trend and price on the same chart for cryptocurrencies</span>
            </h4>
          </header>
        </section>
        <section className="container">
          <div className="row">
            <div className="col-md-12 trend-index__charts-container">
              <TrendsChartWrapper />
              <div className="row trend-index__table-header">
                <div className="col-md-12 trend-index__google-trend-lastest-date">
                  Click on name to view details
                </div>
              </div>
              <div className="row trend-index__table-header">
                <div className="col-md-3">Name</div>
                <div className="col-md-3">Market Cap (USD)</div>
                <div className="col-md-2">24h Price % Change</div>
                <div className="col-md-2">7d Price % Change</div>
                <div className="col-md-2">7d Trend % Change</div>
              </div>

              <ListView
                viewClassName={"row trend-index__tbody"}
                rowClassName={"container"}
                rowsIdArray={this.props.tickerArray}
                rowsById={this.props.tokensByTicker}
                renderRow={this.renderRow}
              />
              <p style={{fontWeight: '600', fontSize: '16px', margin: '30px 0 0 0px'}}>More To Come</p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  renderRow(tokenId, token) {
    return (
      <ListRow
        className="row trend-index__row"
        rowId={tokenId}
        onClick>
          <Link className={`col-md-3 name`} to={`/chart/${token.ticker}`}>
            {token.name} ({token.ticker})
          </Link>
          <div className={`col-md-3`}>
            {token.marketCapUsd}
          </div>
          <div className={`col-md-2 ${(token.pricePercentChange24h <=0) ? 'red' : 'green'}`}>
            {token.pricePercentChange24h}
          </div>
          <div className={`col-md-2 ${(token.pricePercentChange7d <=0) ? 'red' : 'green'}`}>
            {token.pricePercentChange7d}
          </div>
          <div className={`col-md-2 ${(token.trendPercentChange7d <=0) ? 'red' : 'green'}`}>
            {token.trendPercentChange7d}
          </div>
      </ListRow>
    )
  }

  handleTokenClick(ticker) {
    console.log(ticker)
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }


}

function mapStateToProps(state) {
  const [tokensByTicker, tickerArray] = getTokenStats(state);
  return {
    tokensByTicker,
    tickerArray,
  }
}


export default connect(mapStateToProps)(TrendIndex)


// <BtcPriceTrendChartWrapper />
// <EthPriceTrendChartWrapper />
// <BchPriceTrendChartWrapper />
// <XrpPriceTrendChartWrapper />
// <XemPriceTrendChartWrapper />
// <LtcPriceTrendChartWrapper />
