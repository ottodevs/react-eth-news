import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import googleTrendsActions from '../store/googleTrends/actions';
import * as googleTrendsSelectors from '../store/googleTrends/reducer';
import {TrendsChart} from '../components'


class TrendsChartWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {

  }

  render() {
    return (

        <div >
          <TrendsChart
            dataProvider={this.props.allDataProvider}
          />
        </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    allDataProvider: googleTrendsSelectors.getAllGoogleTrendsOverTime(state)
  }
}

export default connect(mapStateToProps)(TrendsChartWrapper)
