import './about.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';

class About extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <div className="TrendIndex">
        <section className="header-section container">
          <header className="row justify-content-center">
            <h4 className="col-md-12">
              <span>About the site</span>
            </h4>
          </header>
          <div className="row justify-content-center">
            <div className="col-md-12 header-section__intro">
              <p className="about__inline-header">
                Motivation
              </p>
              <p>
                There are plenty of discussion going on about whether Google Trend is a good predictor for cryptocurrency price. For example
              </p>
              <p><a target="_" href="https://qz.com/1052656/bitcoin-price-google-trends-can-help-you-figure-where-bitcoins-price-is-headed/">Bitcoin price breaks $4,000. Here’s why - Quartz</a></p>
              <p><a target="_" href="https://www.coindesk.com/using-google-trends-detect-bitcoin-price-bubbles/">Using Google Trends to Detect Bitcoin Price Bubbles - CoinDesk</a></p>
              <p>So I built this site to: </p>
              <p>
                1. examine the correlation between google trend and price for various cryptocurrencies. Currently support Bitcoin, Ether, Ripple, NEM, and Litecoin. I'm planning on to add more.
              </p>
              <p>
                2. track whether Ethereum is on the cusp of going mainstream by looking the result from Google Trends and number of articles mentioning Ethereum in the mainstream media/content platform.
              </p>
              <p className="about__inline-header">
                Author
              </p>
              <p>
                Please send any suggestions and questions to: ytienchu@gmail.com
              </p>
              <p className="about__inline-header">A couple of disclaimers: </p>
              <p>
                The <a target="_" href="https://icons8.com/icon/18518/Full-Moon">moon icon</a> on the navbar is from this awesome site <a target="_" href="https://icons8.com/">Icons8</a>.
              </p>
              <p>
                The information is not meant to be, and should not be construed as investment advice.
              </p>
            </div>
          </div>
        </section>
      </div>
    )

  }
}

export default About
