import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const AdminRoute = ({
  component: Component,
  isAuthenticated,
  loading,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to='/' />
      ) : user !== null && user.data.role !== 'Admin' ? (
        <Redirect to='/' />
      ) : (
        <Component {...props} />
      )
    }
  />
)

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
})
export default connect(mapStateToProps)(AdminRoute)
