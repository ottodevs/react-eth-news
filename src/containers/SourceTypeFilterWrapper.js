import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import {SourceTypeFilter} from '../components';
import * as paginationActions from '../store/pagination/actions';
import * as sourcesActions from '../store/sources/actions';
import * as sourceTypesActions from '../store/sourceTypes/actions';
import * as sourceTypesSelectors from '../store/sourceTypes/reducer';


class SourceTypeFilterWrapper extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  onSourceTypeFilterChanged(newSourceType) {
    this.props.dispatch(sourceTypesActions.changeSourceType(newSourceType));
    this.props.dispatch(sourcesActions.getSources());
    this.props.dispatch(paginationActions.updatePageCount());
  }

  render() {

    return (
      <SourceTypeFilter
        className="row justify-content-center"
        sourceTypes={this.props.sourceTypes}
        selected={this.props.currentSourceType}
        onChanged={this.onSourceTypeFilterChanged}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    sourceTypes: sourceTypesSelectors.getSourceTypes(state),
    currentSourceType: sourceTypesSelectors.getCurrentSourceType(state)
  }
}

export default connect(mapStateToProps)(SourceTypeFilterWrapper)
