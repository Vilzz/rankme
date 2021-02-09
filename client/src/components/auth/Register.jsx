import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserPlus,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import { register } from '../../actions/auth'
import { setAlert } from '../../actions/alert'
import { connect } from 'react-redux'

const Register = ({ register, setAlert, history }) => {
  const [showEye, setShowEye] = useState(false)

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    code: '',
    password: '',
    password2: '',
  })
  const onSubmit = (e) => {
    e.preventDefault()
    if (registerData.password !== registerData.password2) {
      setAlert('Пароли не совпадают', 'danger')
    } else {
      register(registerData, history)
    }
  }
  const onChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    })
  }
  const eyeClick = () => {
    setShowEye(!showEye)
  }

  return (
    <Container className='login-container'>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <h1 className='display-2 py-1 login_header'>
            <span className='text-primary'>Регистрация</span>
          </h1>
          <h3 className='text-primary'>
            <FontAwesomeIcon icon={faUserPlus} /> Создать аккаунт
          </h3>
          <Form onSubmit={(e) => onSubmit(e)} autoComplete='off'>
            <Form.Group controlId='formName' className='mb-2'>
              <Form.Control
                size='lg'
                type='text'
                placeholder='Ваше имя'
                name='name'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId='formEmail' className='mb-2'>
              <Form.Control
                size='lg'
                type='email'
                placeholder='Электронная почта'
                name='email'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group controlId='formCode' className='mb-2'>
              <Form.Control
                size='lg'
                type='text'
                placeholder='Код регистрации'
                name='code'
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
            <InputGroup className='mb-2' size='lg'>
              <Form.Control
                type={showEye ? 'text' : 'password'}
                placeholder='Повторите пароль'
                name='password2'
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
            <div className='d-grid'>
              <Button
                variant='primary'
                type='submit'
                size='lg'
                className='mt-3 text-white'
              >
                Зарегистрироваться
              </Button>
            </div>
          </Form>
          <h5 className='mt-3'>
            Уже зарегистрирован? <Link to='/'>Войти</Link>
          </h5>
        </Col>
      </Row>
    </Container>
  )
}

export default connect(null, { register, setAlert })(Register)
