import 'react-dates/lib/css/_datepicker.css';
import './DateRangePickerWrapper.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import moment from 'moment';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import * as datesSelectors from '../store/dates/reducer';
import * as datesActions from '../store/dates/actions'

class DateRangePickerWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.props.dispatch(datesActions.changeDateRange({ startDate, endDate }, 'filter'))
  }

  onFocusChange(focusedInput) {
    this.props.dispatch(datesActions.changeFocusedInput(focusedInput))
  }

  render() {

    return (

        <div className="date-range-picker__wrapper col-md-auto col-sm-12">
          <DateRangePicker
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={this.props.focusedInput}
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            isOutsideRange={() => false}
          />
        </div>

    );
  }
}

function mapStateToProps(state) {
  return _.assignIn({ focusedInput: datesSelectors.getCurrentFocusedInput(state) },
    datesSelectors.getCurrentDateRange(state))
}

export default connect(mapStateToProps)(DateRangePickerWrapper)
