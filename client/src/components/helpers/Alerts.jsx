import React from 'react'
import { Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
const Alerts = ({ alerts }) => (
  <div className='alerts mx-auto'>
    {alerts !== null &&
      alerts.length > 0 &&
      alerts.map((alert) => (
        <Alert key={alert.id} variant={alert.alertType}>
          <FontAwesomeIcon icon={faBullhorn} transform='left-5' /> {alert.msg}{' '}
        </Alert>
      ))}
  </div>
)
const mapStateToProps = (state) => ({
  alerts: state.alert,
})
export default connect(mapStateToProps)(Alerts)
