import './Social.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import FontAwesome from 'react-fontawesome'
import {
  ShareButtons,
  ShareCounts
} from 'react-share'


class Social extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const {
      FacebookShareButton,
      GooglePlusShareButton,
      LinkedinShareButton,
      TwitterShareButton,
      RedditShareButton,
    } = ShareButtons;

    const {
      FacebookShareCount,
      GooglePlusShareCount,
      LinkedinShareCount,
      RedditShareCount,
    } = ShareCounts;

    return (
      <div className="social-wrapper">
        <div className="share-wrapper">
          <FacebookShareButton quote={this.props.title} url={this.props.url}>
            <FontAwesome
              className=''
              name='facebook'
              size='lg'
            />
          </FacebookShareButton>
          <FacebookShareCount
            url={this.props.url}
            className="Demo__some-network__share-count">
            {count => count}
          </FacebookShareCount>
        </div>

        <div className="share-wrapper">
          <TwitterShareButton title={this.props.title} url={this.props.url}>
            <FontAwesome
              className=''
              name='twitter'
              size='lg'
            />
          </TwitterShareButton>
        </div>

        <div className="share-wrapper">
          <RedditShareButton title={this.props.title} url={this.props.url}>
            <FontAwesome
              className=''
              name='reddit'
              size='lg'
            />
          </RedditShareButton>
          <RedditShareCount
            url={this.props.url}
            className="Demo__some-network__share-count">
            {count => count}
          </RedditShareCount>
        </div>

        <div className="share-wrapper">
          <LinkedinShareButton title={this.props.title} url={this.props.url}>
            <FontAwesome
              className=''
              name='linkedin'
              size='lg'
            />
          </LinkedinShareButton>
          <LinkedinShareCount
            url={this.props.url}
            className="Demo__some-network__share-count">
            {count => count}
          </LinkedinShareCount>
        </div>

        <div className="share-wrapper">
          <GooglePlusShareButton title={this.props.title} url={this.props.url}>
            <FontAwesome
              className=''
              name='google-plus'
              size='lg'
            />
          </GooglePlusShareButton>
          <GooglePlusShareCount
            url={this.props.url}
            className="Demo__some-network__share-count">
            {count => count}
          </GooglePlusShareCount>
        </div>


      </div>
    )

  }
}

export default Social
