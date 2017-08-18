import React, {Component} from 'react'
import {connect} from 'react-redux'
import autoBind from 'react-autobind'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import  ReactGA from 'react-ga'
import {Main, Login, Signup, UserHome} from './components'
import {ArticlesIndex} from './containers'
import {me} from './store'



class Routes extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
    ReactGA.initialize('UA-104804205-1', {
      debug: true
    })
    this.props.loadInitialData()
  }

  logPageView() {
    ReactGA.set({ page: window.location.pathname + window.location.search });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history} onUpdate={this.logPageView}>
        <Main>
          <Route path='/' component={ArticlesIndex} />
        </Main>
      </Router>
    )
  }
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
