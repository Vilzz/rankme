import React from 'react'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { connect } from 'react-redux'

const UserDashBoard = ({ loading, user }) => {
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={6}>
          <h1 className='text-white display-4'>Учетные данные</h1>
          <ListGroup>
            {!loading && user !== null && (
              <>
                <ListGroup.Item className='userdata px-4'>
                  Имя пользователя:
                  <span className='text-primary'>{user.data.name}</span>
                </ListGroup.Item>
                <ListGroup.Item className='userdata px-4'>
                  Адрес элетронной почты:{' '}
                  <span className='text-primary'>{user.data.email}</span>
                </ListGroup.Item>
              </>
            )}
          </ListGroup>
          <Row>
            <Col>
              <Button className='text-white text-uppercase mt-3 w-100'>
                Изменить пароль
              </Button>
            </Col>
            <Col>
              <Button
                variant='danger'
                className='text-white text-uppercase mt-3 w-100'
              >
                Изменить почту
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
})
export default connect(mapStateToProps)(UserDashBoard)
