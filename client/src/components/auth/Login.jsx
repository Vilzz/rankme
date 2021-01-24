import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSignInAlt,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import { login } from '../../actions/auth'
import { connect } from 'react-redux'

const Login = ({ login, isAuthenticated, user }) => {
  const [showEye, setShowEye] = useState(false)
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })
  if (isAuthenticated && user !== null) {
    switch (user.data.role) {
      case 'Super':
        return <Redirect to='/superdashboard' />
      case 'Admin':
        return <Redirect to='/admindashboard' />
      default:
        return <Redirect to='/listqueries' />
    }
  }
  const onChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    login(loginData)
  }
  const eyeClick = () => {
    setShowEye(!showEye)
  }
  return (
    <Container className='login-container'>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <h1 className='display-2 py-1 login_header text-primary'>
            Вход в аккаунт
          </h1>
          <h3 className='text-primary'>
            <FontAwesomeIcon icon={faSignInAlt} /> Войти в аккаунт
          </h3>
          <Form onSubmit={(e) => onSubmit(e)} autoComplete='off'>
            <Form.Group controlId='formEmail' className='mb-2'>
              <Form.Control
                size='lg'
                type='email'
                placeholder='Электронная почта'
                name='email'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>

            <InputGroup className='mb-2' size='lg'>
              <Form.Control
                type={showEye ? 'text' : 'password'}
                placeholder='Пароль'
                name='password'
                onChange={(e) => onChange(e)}
              />
              <InputGroup.Append>
                <Button
                  variant='primary'
                  size='lg'
                  className='text-white eye-btn'
                  onClick={eyeClick}
                >
                  <FontAwesomeIcon
                    icon={showEye ? faEye : faEyeSlash}
                    size='lg'
                  />
                </Button>
              </InputGroup.Append>
            </InputGroup>

            <Form.Group controlId='formCheckbox' className='mt-3'>
              <Form.Check type='checkbox' label='Запомнить меня' />
            </Form.Group>
            <div className='d-grid'>
              <Button
                variant='primary'
                type='submit'
                size='lg'
                className='mt-3 text-white'
              >
                Войти
              </Button>
            </div>
          </Form>
          <h5 className='mt-3'>
            Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link>
          </h5>
          <h5 className='mt-3'>
            Забыли пароль? <Link to='/forgotpassword'>Сбросить пароль</Link>
          </h5>
        </Col>
      </Row>
    </Container>
  )
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
})
export default connect(mapStateToProps, { login })(Login)
