import _ from 'lodash';
import React, { Component } from 'react';

export default class SourceTypeFilter extends Component {

  render() {
    return (
      <div className={this.props.className}>
        {this.renderFilter('all')}
        {_.map(this.props.sourceTypes, (sourceType) => this.renderFilter(sourceType))}
      </div>
    );
  }

  renderFilter(id) {
    const className = this.props.selected === id ? 'selected' : undefined;
    return (
      <a
        key={id}
        href="#"
        className={className}
        onClick={() => this.onFilterClick(id)}>
        {id.toUpperCase()}
      </a>
    );
  }

  onFilterClick(id) {
    if (id === this.props.selected) return;
    if (typeof this.props.onChanged === 'function') {
      this.props.onChanged(id);
    }
  }

}
