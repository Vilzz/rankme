import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Register from '../components/auth/Register.jsx'
import ResetPassword from '../components/auth/ResetPassword.jsx'
import ForgotPassword from '../components/auth/ForgotPassword.jsx'
import UserDashBoard from '../components/dashboard/UserDashBoard.jsx'
import CreateQuery from '../components/queries/CreateQuery.jsx'
import ListQueries from '../components/queries/ListQueries.jsx'
import UpdateQuery from '../components/queries/UpdateQuery.jsx'

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/forgotpassword' component={ForgotPassword} />
        <Route
          exact
          path='/resetpassword/:resettoken'
          component={ResetPassword}
        />
        <PrivateRoute exact path='/userdashboard' component={UserDashBoard} />
        <PrivateRoute exact path='/createquery' component={CreateQuery} />
        <PrivateRoute exact path='/listqueries' component={ListQueries} />
        <PrivateRoute exact path='/updatequery/:id' component={UpdateQuery} />
      </Switch>
    </>
  )
}

export default Routes
