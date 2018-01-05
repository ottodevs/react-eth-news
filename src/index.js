import 'normalize.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'jQuery'
import 'Tether'
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.scss'
import '@amcharts/amcharts3-react';
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import storePromise from './store'
import Routes from './routes'

storePromise()
  .then(store => {
    ReactDOM.render(
      <Provider store={store}>
        <Routes />
      </Provider>,
      document.getElementById('app')
    )
  })
