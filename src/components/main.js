import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from './Navbar.js'
import { fetchTokenStats } from '../store/tokenStats/actions';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchTokenStats())
  }

  render() {
    return (
      <div style={{
              position: 'relative'}}>
      <Navbar />
      <div className="page-wrap" style={{
              borderTop: '1px solid #f3f3f3',
              paddingTop: '50px',
              marginBottom: '60px'}}>

        {this.props.children}
      </div>
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">Copyright © CryptoCurrent 2017</div>
            <div className="col-md-6">
              <div className="row">
              <div className="col-md-3 col-sm-12">
                <div>Donate?</div>
              </div>
              <div className="col-md-9 col-sm-12">
                <div style={{marginBottom: '10px'}}>
                  Any amount will help support and improve CryptoCurrent. Thank you!
                </div>
                <div>BTC: 19jA3afUePfBAo95W1fMATAtfkmJd9uK7i</div>
                <div>ETH: 0xa39412f268920BF12464612431202C27750145f9</div>
              </div>
              </div>
            </div>
          </div>

        </div>
      </footer>
      </div>
    )

  }
}

/**
 * CONTAINER
 */
const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapStateToProps)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object
}
