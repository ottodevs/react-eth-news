import './TrendIndex.scss'
import React, { Component } from 'react'
import autoBind from 'react-autobind'
import { connect } from 'react-redux'
import * as trendIndexChartsActions from '../store/trendIndexCharts/actions'
import { getTokenStats, getTokenStatsFetchedError } from '../store/tokenStats/reducer'
import { ListView, ListRow } from '../components'
import { TrendsChartWrapper } from './index'
import { PriceTrendChart, Social } from '../components'
import { Link } from 'react-router-dom'



class TrendIndex extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    if (_.isEmpty(this.props.tokensByTicker) && !this.props.errorMessage) return this.renderLoading();
    if (this.props.errorMessage) return (
      <div style={{margin: '250px auto', textAlign: 'center'}}>{this.props.errorMessage}</div>
    )
    const latestGoogleTrendDataDate = this.props.tokensByTicker[this.props.tickerArray[0]] ?
      this.props.tokensByTicker[this.props.tickerArray[0]].endDate : ''
    return (
      <div className="TrendIndex">
        <Social url={'https://www.cryptocurrent.co'} title={'Google Trends Meet Cryptocurrencies'} />
        <section className="header-section container">
          <header className="row justify-content-center">
            <h4 className="col-md-12" style={{textAlign: 'center', padding: '50px 0px'}}>
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
                  Click to view details
                </div>
              </div>

              <ListView
                viewClassName={"row trend-index__tbody"}
                rowClassName={"col-md-6 col-lg-4"}
                rowsIdArray={this.props.tickerArray}
                rowsById={this.props.tokensByTicker}
                renderRow={this.renderRow}
              />
            </div>
          </div>
        </section>
      </div>
    )
  }

  renderRow(tokenId, token) {
    return (
      <ListRow
        className="trend-index__row"
        rowId={tokenId}
        onClick>
        <Link className="card-wrapper" to={`/chart/${token.ticker}`}>
          <div className="card">
            <div className="card-header">
               {token.name} ({token.ticker})
            </div>
            <div className="card-block">
              <table style={{width: '100%'}}>
                <tbody>
                  <tr>
                    <td>Market Cap (USD)</td>
                    <td>${this.numberWithCommas(token.marketCapUsd)}</td>
                  </tr>
                  <tr>
                    <td>Price (USD)</td>
                    <td>${token.priceUsd}</td>
                  </tr>
                  <tr>
                    <td>
                      24h Price % Change
                    </td>
                    <td className={`trend-index__percent-change ${(token.pricePercentChange24h <=0) ? 'red' : 'green'}`}>{token.pricePercentChange24h}</td>
                  </tr>
                  <tr>
                    <td>
                      7d Price % Change
                    </td>
                    <td className={`trend-index__percent-change ${(token.pricePercentChange7d <=0) ? 'red' : 'green'}`}>{token.pricePercentChange7d}</td>
                  </tr>
                  <tr>
                    <td>
                      7d Trend % Change
                    </td>
                    <td className={`trend-index__percent-change ${(token.trendPercentChange7d <=0) ? 'red' : 'green'}`}>{token.trendPercentChange7d}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          </Link>
      </ListRow>
    )
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  renderLoading() {
    return (
      <div style={{margin: '250px auto', textAlign: 'center'}}><p>Loading...</p></div>
    );
  }


}

function mapStateToProps(state) {
  const [tokensByTicker, tickerArray] = getTokenStats(state);
  const errorMessage = getTokenStatsFetchedError(state)
  return {
    tokensByTicker,
    tickerArray,
    errorMessage
  }
}


export default connect(mapStateToProps)(TrendIndex)

