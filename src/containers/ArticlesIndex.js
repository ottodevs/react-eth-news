import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as articlesActions from '../store/articles/actions';
import * as articlesSelectors from '../store/articles/reducer';
import * as sourceTypesActions from '../store/sourceTypes/actions';
import * as sourceTypesSelectors from '../store/sourceTypes/reducer';
import {ListView, ListRow, SourceTypeFilter} from '../components';

class ArticlesIndex extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(articlesActions.fetchArticles());
  }

  render() {
    if (!this.props.articlesById) return this.renderLoading();
    return (
      <div className="ArticlesIndex">
        <SourceTypeFilter
          className="SourceTypeFilter"
          sourceTypes={this.props.sourceTypes}
          selected={this.props.currentSourceType}
          onChanged={this.onFilterChanged}
        />
        <ListView
          rowsIdArray={this.props.articlesIdArray}
          rowsById={this.props.articlesById}
          renderRow={this.renderRow}
        />
      </div>
    )
  }

  renderLoading() {
    return (
      <p>Loading...</p>
    );
  }

  renderRow(articleId, article) {
    return (
      <ListRow
        rowId={articleId}
        onClick
        selected>
        <h3>{article.date}</h3>
        <h3>{article.title}</h3>
        <h3>{article.type}</h3>
        <h3>{article.source}</h3>
      </ListRow>
    )
  }

  onFilterChanged(newSourceType) {
    this.props.dispatch(sourceTypesActions.changeSourceType(newSourceType));
  }
}

function mapStateToProps(state) {
  const [articlesById, articlesIdArray] = articlesSelectors.getArticles(state);
  return {
    articlesById,
    articlesIdArray,
    sourceTypes: sourceTypesSelectors.getSourceTypes(state),
    currentSourceType: sourceTypesSelectors.getCurrentSourceType(state)
  }
}

export default connect(mapStateToProps)(ArticlesIndex)
