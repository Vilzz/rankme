import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { sports } from './sports.js'
import { connect } from 'react-redux'
import { createQuery } from '../../actions/queries'

const CreateQuery = ({ loading, user, createQuery }) => {
  const [sportsList, setSportsList] = useState([])
  const [queryData, setQueryData] = useState({
    createdby: '',
    name: '',
    secondname: '',
    lastname: '',
    trainer: '',
    sport: '',
    federation: '',
    rank: '',
  })
  useEffect(() => {
    setSportsList([...sports])
    // eslint-disable-next-line
  }, [])
  useEffect(() => {
    setQueryData({
      ...queryData,
      createdby: !loading && user !== null ? user.data._id : '',
    })
    // eslint-disable-next-line
  }, [loading, user])
  const onChange = (e) => {
    if (e.target.name === 'sport') {
      const federation = sportsList.filter(
        (sport) => sport.sport === e.target.value
      )[0].federation
      setQueryData({
        ...queryData,
        [e.target.name]: e.target.value,
        federation,
      })
    } else {
      setQueryData({ ...queryData, [e.target.name]: e.target.value })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    createQuery(queryData)
  }

  return (
    <Container className='query-container'>
      <Row className='justify-content-md-center'>
        <Col md={6}>
          <h1 className='display-2 py-1 login_header text-primary'>
            Создать запрос
          </h1>
          <h3 className='text-primary'>
            <FontAwesomeIcon icon={faPlusCircle} transform='left-5' />
            Создание запроса на присвоение разряда
          </h3>
          <Form autoComplete='off' onSubmit={(e) => onSubmit(e)}>
            <Form.Group className='mb-2'>
              <Form.Control
                size='lg'
                type='text'
                placeholder='Имя спортсмена'
                name='name'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Control
                size='lg'
                type='text'
                placeholder='Отчество спортсмена'
                name='secondname'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Control
                size='lg'
                type='text'
                placeholder='Фамилия спортсмена'
                name='lastname'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Control
                size='lg'
                type='text'
                placeholder='Тренер'
                name='trainer'
                onChange={(e) => onChange(e)}
              />
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>Вид спорта</Form.Label>
              <Form.Control
                as='select'
                size='lg'
                name='sport'
                onChange={(e) => onChange(e)}
              >
                <option>Выбери вид спорта</option>
                {sportsList.map((sport, idx) => (
                  <option key={idx}>{sport.sport}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label className='rank-check-label'>Присвоить </Form.Label>
              <Form.Check
                inline
                type='radio'
                size='lg'
                name='rank'
                label='Первый'
                value='1'
                onChange={(e) => onChange(e)}
              ></Form.Check>
              <Form.Check
                inline
                type='radio'
                size='lg'
                name='rank'
                value='2'
                label='Второй'
                onChange={(e) => onChange(e)}
              ></Form.Check>
              <Form.Check
                inline
                type='radio'
                size='lg'
                name='rank'
                value='3'
                label='Третий'
                selected={true}
                onChange={(e) => onChange(e)}
              ></Form.Check>
              <Form.Label> разряд</Form.Label>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.File id='custom-file' label='Добавить документ' custom />
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
  loading: state.auth.loading,
  user: state.auth.user,
})
export default connect(mapStateToProps, { createQuery })(CreateQuery)
