import './social.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { FacebookButton, FacebookCount } from "react-social";


class Social extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    const appId = '';
    const url = 'https://eth-news.herokuapp.com/all'
    return (
      <FacebookButton url={url} appId={appId}>
        <FacebookCount url={url} />
        {" Share " + url}
      </FacebookButton>
    )

  }
}

export default Social
