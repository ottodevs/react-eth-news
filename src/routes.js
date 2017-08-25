import React, {Component} from 'react'
import {connect} from 'react-redux'
import autoBind from 'react-autobind'
import {Router} from 'react-router'
import {Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, About} from './components'
import {ArticlesIndex, TrendIndex} from './containers'
import {me} from './store'


class Routes extends Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route path='/all' component={TrendIndex} />
            <Route path='/eth' component={ArticlesIndex} />
            <Route path='/about' component={About} />
            <Route render={() => <Redirect to="/all"/>}/>
          </Switch>
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
