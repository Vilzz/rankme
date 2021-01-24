import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { forgotPassword } from '../../actions/auth'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons'

const ForgotPassword = ({ forgotPassword }) => {
  const [email, setEmail] = useState('')
  const onChange = (e) => {
    setEmail(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    forgotPassword(email)
  }
  return (
    <Container className='login-container'>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <h1 className='display-2 py-1 login_header text-primary'>
            Восстановление пароля
          </h1>
          <h3 className='text-primary'>
            <FontAwesomeIcon icon={faWindowRestore} /> Восстановление пароля
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
            <div className='d-grid'>
              <Button
                variant='primary'
                type='submit'
                size='lg'
                className='mt-3 text-white'
              >
                Сбросить пароль
              </Button>
            </div>
          </Form>
          <h5 className='mt-3'>
            Уже зарегистрирован? <Link to='/'>Войти</Link>
          </h5>
          <h5 className='mt-3'>
            Нет аккаунта? <Link to='/register'>Зарегистрироваться</Link>
          </h5>
        </Col>
      </Row>
    </Container>
  )
}

export default connect(null, { forgotPassword })(ForgotPassword)
