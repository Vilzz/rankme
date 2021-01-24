import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Mainnav from './components/navs/Mainnav.jsx'
import Login from './components/auth/Login.jsx'
import Alerts from './components/helpers/Alerts.jsx'
import Routes from './routing/Routes'

import Pdfloader from './Pdfloader'
import Createpdf from './Createpdf'
import store from './store'
import setAuthToken from './utils/setAuthToken.js'
import { loadUser } from './actions/auth'
import './scss/App.scss'

localStorage.token && setAuthToken(localStorage.token)
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])
  return (
    <Provider store={store}>
      <Router>
        <>
          <Mainnav />
          <Alerts />
          <Switch>
            <Route exact path='/' component={Login} />
            <Routes component={Routes} />
          </Switch>
        </>
      </Router>
    </Provider>
  )
}

export default App
