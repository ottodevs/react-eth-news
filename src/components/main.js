import React, { Component } from 'react';
import autoBind from 'react-autobind';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'
import Navbar from './Navbar.js'

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

  render() {
    return (
      <div>
      <Navbar />
      <div style={{
              borderTop: '1px solid #f3f3f3',
              paddingTop: '50px'}}>

        {this.props.children}
      </div>
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
