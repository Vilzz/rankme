import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { updateQuery, getQuery } from '../../actions/queries'
import { sports } from './sports.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const UpdateQuery = ({
  qryLoading,
  query,
  usrLoading,
  user,
  updateQuery,
  getQuery,
  match,
}) => {
  const { id } = match.params
  const [updateData, setUpdateData] = useState({
    changedby: '',
    name: '',
    secondname: '',
    lastname: '',
    trainer: '',
    sport: '',
    federation: '',
    rank: '',
  })

  useEffect(() => {
    getQuery(id)
  }, [id, getQuery])

  useEffect(() => {
    setUpdateData({
      ...updateData,
      changedby: !usrLoading && user !== null ? user.data._id : '',
      name: !qryLoading && query !== null ? query.data.name : '',
      secondname: !qryLoading && query !== null ? query.data.secondname : '',
      lastname: !qryLoading && query !== null ? query.data.lastname : '',
      trainer: !qryLoading && query !== null ? query.data.trainer : '',
      status: !qryLoading && query !== null ? query.data.status : '',
      rank: !qryLoading && query !== null ? query.data.rank : '',
      sport: !qryLoading && query !== null ? query.data.sport : '',
      federation: !qryLoading && query !== null ? query.data.federation : '',
    })
    // eslint-disable-next-line
  }, [usrLoading, user, qryLoading, query])

  const onChange = (e) => {
    if (e.target.name === 'sport') {
      const federation = sports.filter(
        (sport) => sport.sport === e.target.value
      )[0].federation
      setUpdateData({
        ...updateData,
        [e.target.name]: e.target.value,
        federation,
      })
    } else {
      setUpdateData({ ...updateData, [e.target.name]: e.target.value })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(updateData)
  }
  return (
    <Container className='query-container'>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <h1 className='display-2 py-1 login_header text-primary'>
            Изменить запрос
          </h1>
          <h3 className='text-primary'>
            <FontAwesomeIcon icon={faEdit} transform='left-5' />
            Изменение запроса на присвоение разряда
          </h3>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column='md' sm={3}>
                Имя спортсмена
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size='lg'
                  type='text'
                  value={updateData.name}
                  name='name'
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column='md' sm={3}>
                Отчество спортсмена
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size='lg'
                  type='text'
                  value={updateData.secondname}
                  name='secondname'
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column='md' sm={3}>
                Фамилия спортсмена
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size='lg'
                  type='text'
                  value={updateData.lastname}
                  name='lastname'
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-2'>
              <Form.Label column='md' sm={3}>
                Тренер спортсмена
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  size='lg'
                  type='text'
                  value={updateData.trainer}
                  placeholder='Тренер'
                  name='trainer'
                  onChange={(e) => onChange(e)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column='md' sm={3}>
                Вид спорта
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as='select'
                  size='lg'
                  name='sport'
                  onChange={(e) => onChange(e)}
                >
                  <option>{updateData.sport}</option>
                  {sports
                    .filter((sport) => sport.sport !== updateData.sport)
                    .map((sport) => (
                      <option key={sport.sport}>{sport.sport}</option>
                    ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Row>
                <Form.Label className='rank-check-label' column='md' sm={3}>
                  Присвоить{' '}
                </Form.Label>
                <Form.Check
                  inline
                  type='radio'
                  size='lg'
                  name='rank'
                  label='Первый'
                  value='1'
                  checked={updateData.rank === '1' ? true : false}
                  onChange={(e) => onChange(e)}
                ></Form.Check>
                <Form.Check
                  inline
                  type='radio'
                  size='lg'
                  name='rank'
                  value='2'
                  label='Второй'
                  checked={updateData.rank === '2' ? true : false}
                  onChange={(e) => onChange(e)}
                ></Form.Check>
                <Form.Check
                  inline
                  type='radio'
                  size='lg'
                  name='rank'
                  value='3'
                  label='Третий'
                  checked={updateData.rank === '3' ? true : false}
                  onChange={(e) => onChange(e)}
                ></Form.Check>
                <Form.Label> разряд</Form.Label>
              </Form.Row>
            </Form.Group>
            <Form.Group as={Row} className='mb-3'>
              <Form.Label column='md' sm={3}>
                Добавить документ
              </Form.Label>
              <Col sm={9}>
                <Form.File id='custom-file' custom />
              </Col>
            </Form.Group>
            <Form.Group className='d-flex justify-content-center'>
              <Button type='submit' size='lg' className='text-white w-100'>
                Разместить запрос на присвоение разряда
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  qryLoading: state.queries.loading,
  query: state.queries.query,
  usrLoading: state.auth.loading,
  user: state.auth.user,
})
export default connect(mapStateToProps, { updateQuery, getQuery })(UpdateQuery)
