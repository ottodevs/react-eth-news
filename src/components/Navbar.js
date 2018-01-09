import './Navbar.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';
import {withRouter, Link} from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render() {
    return (
      <nav className="navbar navbar-light navbar-toggleable-md container">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to='/all' className="navbar-brand">
          <img src={'/moon.png'} width="50" height="50" alt="Cryptotrends" />
          <h3>CryptoCurrent</h3>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <Link to='/all' className="nav-link">All</Link>
            </li>
            <li className="nav-item pull-xs-right">
              <Link to='/about' className="nav-link">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    )

  }
}

export default withRouter(Navbar)
