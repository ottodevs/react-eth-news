import './ArticlesIndex.scss';
import 'react-select/dist/react-select.css';
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import moment from 'moment';
import { changeDateRange } from '../store/dates/actions';
import * as paginationActions from '../store/pagination/actions';
import * as trendIndexChartsActions from '../store/trendIndexCharts/actions';
import googleTrendsActions from '../store/googleTrends/actions';
import pricesActions from '../store/prices/actions';
import { getArticles } from '../store/articles/reducer';
import { getCurrentPage, getPageCount } from '../store/pagination/reducer';
import { updateCurrentSources } from '../store/sources/actions';
import { getSourcesForDisplay, getCurrentSources } from '../store/sources/reducer';
import {ListView, ListRow} from '../components';
import {DateRangePickerWrapper, SourceTypeFilterWrapper, ArticleIndexChartsWrapper} from '../containers';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';

class ArticlesIndex extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(changeDateRange({ startDate: moment('Jan 01, 2017'), endDate: moment()}, 'init'))
  }

  render() {
    if (!this.props.articlesById) return this.renderLoading();
    return (
      <div className="ArticlesIndex">
        <section className="header-section container">
          <header className="row justify-content-center">
            <h4 className="col-md-12">
              <span>Ethereum mainstream media exposure over time</span>
            </h4>
          </header>
          <SourceTypeFilterWrapper/>
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="container">
                <div className="row">
                  <DateRangePickerWrapper/>
                  <div className="col-md-7 col-sm-12 source-select__container">
                    <Select
                      name="source-select"
                      placeholder="Select news outlets..."
                      value={this.props.currentSources}
                      options={this.props.sources}
                      onChange={this.handleSourceSelect}
                      multi={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="row">
            <ArticleIndexChartsWrapper/>
            <div  className="col-md-6">
              <ListView
                rowsIdArray={this.props.articlesIdArray}
                rowsById={this.props.articlesById}
                renderRow={this.renderRow}
              />
              <ReactPaginate previousLabel={"previous"}
                 nextLabel={"next"}
                 breakLabel={<a href="">...</a>}
                 breakClassName={"break-me hidden-sm-down"}
                 pageCount={this.props.pageCount}
                 marginPagesDisplayed={1}
                 pageRangeDisplayed={3}
                 onPageChange={this.handlePageClick}
                 containerClassName={"pagination"}
                 pageClassName={"page-item hidden-sm-down"}
                 pageLinkClassName={"page-link hidden-sm-down"}
                 previousClassName={"page-item previous"}
                 previousLinkClassName={"page-link previous"}
                 nextClassName={"page-item next"}
                 nextLinkClassName={"page-link next"}
                 activeClassName={"active"} />
            </div>
          </div>
        </section>
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
          <a target="_" href={article.link}><h5>{article.title}</h5></a>
          <h6>{moment.unix(article.date).format('MMM DD, YYYY')}</h6>
        </div>
        <div className="col-md-4 article-item--right">
          <h6>{article.source}</h6>
        </div>
      </ListRow>
    )
  }

  handlePageClick(page) {
    // offset = page.selected
    this.props.dispatch(paginationActions.changePage(page.selected));
  };

  handleSourceSelect(selected) {
    this.props.dispatch(updateCurrentSources(selected))
    this.props.dispatch(paginationActions.updatePageCount());
  };

}

function mapStateToProps(state) {
  const [articlesById, articlesIdArray] = getArticles(state);
  const [offset, limit] = getCurrentPage(state);
  return {
    articlesById,
    articlesIdArray,
    offset,
    limit,
    pageCount: getPageCount(state),
    sources: getSourcesForDisplay(state),
    currentSources: getCurrentSources(state)
  }
}

export default connect(mapStateToProps)(ArticlesIndex)
