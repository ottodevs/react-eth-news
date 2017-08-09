import './ArticlesIndex.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as articlesActions from '../store/articles/actions';
import * as articlesSelectors from '../store/articles/reducer';
import * as sourceTypesActions from '../store/sourceTypes/actions';
import * as sourceTypesSelectors from '../store/sourceTypes/reducer';
import {ListView, ListRow, SourceTypeFilter} from '../components';
import {DateRangePickerWrapper} from '../containers'



class ArticlesIndex extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(articlesActions.fetchArticles());
  }

  onSourceTypeFilterChanged(newSourceType) {
    this.props.dispatch(sourceTypesActions.changeSourceType(newSourceType));
  }

  render() {
    if (!this.props.articlesById) return this.renderLoading();
    return (
      <div className="ArticlesIndex">
        <section className="header-section container">
          <header className="row justify-content-center">
            <h1 className="col-md-6">
              <span>Ethereum</span><br/>
              <span>in mainstream media</span>
            </h1>
          </header>
          <SourceTypeFilter
            className="row justify-content-center"
            sourceTypes={this.props.sourceTypes}
            selected={this.props.currentSourceType}
            onChanged={this.onSourceTypeFilterChanged}
          />
          <DateRangePickerWrapper/>
        </section>
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
        className="row article-item"
        rowId={articleId}
        onClick
        selected>
        <div className="col-md-8 article-item--left">
          <h5>{article.title}</h5>
          <h6>{article.date}</h6>
        </div>
        <div className="col-md-4 article-item--right">
          <h6>{article.source}</h6>
        </div>
      </ListRow>
    )
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
