import './Navbar.scss'
import React, { Component } from 'react';
import autoBind from 'react-autobind';

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
        <a className="navbar-brand" href="/all">
          <img src={'/moon.png'} width="50" height="50" alt="Cryptotrends" />
          <h3>Cryptotrends</h3>
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/all">All <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/eth">Ethererum going mainstream</a>
            </li>
            <li className="nav-item pull-xs-right">
              <a className="nav-link" href="#">About</a>
            </li>
          </ul>
        </div>
      </nav>
    )

  }
}

export default Navbar
