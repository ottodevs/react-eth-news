import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import {
  fetchGoogleTrendsOverTimeFromTicker,
  fetchGoogleTrendsDailyFromTicker
} from '../store/googleTrends/actions';

import { getAllGoogleTrendsOverTime } from '../store/googleTrends/reducer';
import {TrendsChart} from '../components'


class TrendsChartWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  shouldComponentUpdate(nextProps) {
    if ((!this.props.allDataProvider || !this.props.allDataProvider.length) && nextProps.allDataProvider.length) return true
    else return false
  }

  componentDidMount() {
      this.props.dispatch(fetchGoogleTrendsOverTimeFromTicker('compare'))
  }

  render() {
    if (this.props.allDataProvider &&
      this.props.allDataProvider !== 404) return (
        <div >
          <TrendsChart
            dataProvider={this.props.allDataProvider}
          />
        </div>
    )
    else return (
      <div></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    allDataProvider: getAllGoogleTrendsOverTime(state)
  }

}


export default connect(mapStateToProps)(TrendsChartWrapper)
