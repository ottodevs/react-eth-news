import './ArticlesIndex.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import moment from 'moment';
import * as datesActions from '../store/dates/actions';
import * as articlesActions from '../store/articles/actions';
import * as paginationActions from '../store/pagination/actions';
import * as articlesSelectors from '../store/articles/reducer';
import * as paginationSelectors from '../store/pagination/reducer';
import {ListView, ListRow} from '../components';
import {DateRangePickerWrapper, SourceTypeFilterWrapper, ChartsWrapper} from '../containers';
import ReactPaginate from 'react-paginate';

class ArticlesIndex extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(datesActions.changeDateRange({ startDate: moment('Jan 01, 2017'), endDate: moment()}, 'init'))
  }

  render() {
    if (!this.props.articlesById) return this.renderLoading();
    return (
      <div className="ArticlesIndex">
        <section className="header-section container">
          <header className="row justify-content-center">
            <h2 className="col-md-12">
              <span>Ethereum</span><br/>
              <span>in mainstream media</span>
            </h2>
          </header>
          <SourceTypeFilterWrapper/>
          <DateRangePickerWrapper/>
        </section>
        <section className="container">
          <div className="row">
            <ChartsWrapper/>
            <div  className="col-md-6">
              <ListView
                rowsIdArray={this.props.articlesIdArray}
                rowsById={this.props.articlesById}
                renderRow={this.renderRow}
              />
              <ReactPaginate previousLabel={"previous"}
                 nextLabel={"next"}
                 breakLabel={<a href="">...</a>}
                 breakClassName={"break-me"}
                 pageCount={this.props.pageCount}
                 marginPagesDisplayed={1}
                 pageRangeDisplayed={3}
                 onPageChange={this.handlePageClick}
                 containerClassName={"pagination"}
                 pageClassName={"page-item"}
                 pageLinkClassName={"page-link"}
                 previousClassName={"page-item"}
                 previousLinkClassName={"page-link"}
                 nextClassName={"page-item"}
                 nextLinkClassName={"page-link"}
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
          <h5>{article.title}</h5>
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

}

function mapStateToProps(state) {
  const [articlesById, articlesIdArray] = articlesSelectors.getArticles(state);
  const [offset, limit] = paginationSelectors.getCurrentPage(state);
  return {
    articlesById,
    articlesIdArray,
    offset,
    limit,
    pageCount: paginationSelectors.getPageCount(state)
  }
}

export default connect(mapStateToProps)(ArticlesIndex)
