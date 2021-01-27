import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  FormCheck,
  FormControl,
} from 'react-bootstrap'
import pdfCreate from '../../utils/pdfCreate'
import { sports } from '../../components/queries/sports'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPrint,
  faFilePdf,
  faTrafficLight,
  faSyncAlt,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllQueries } from '../../actions/queries'

const AdminDashBoard = ({ qryLoading, queries, getAllQueries }) => {
  const [dataForPdf, setDataForPdf] = useState([])
  const [activeSport, setActiveSport] = useState('Выбери вид спорта')

  useEffect(() => {
    getAllQueries()
  }, [getAllQueries])

  useEffect(() => {
    const qryData =
      !qryLoading && queries !== null
        ? queries.data.map((query) => {
            return { ...query, grouped: false }
          })
        : []

    setDataForPdf([...qryData])
  }, [qryLoading, queries])

  const onClick = (e) => {
    pdfCreate(dataForPdf)
  }

  const onChange = (e) => {
    const tmpArray = [...dataForPdf]
    const idx = dataForPdf.findIndex(
      (dt) => dt._id === e.target.attributes.data.value
    )
    tmpArray[idx].grouped = !tmpArray[idx].grouped
    setDataForPdf([...tmpArray])
  }

  const setFilter = (e) => {
    setActiveSport(e.target.value)
    getAllQueries(`?sport=${e.target.value}`)
  }
  const clearFilter = () => {
    setActiveSport('Выбери вид спорта')
    getAllQueries()
  }
  const query_status = (sts) => {
    return [
      { status: 'Создан', color: 'warning' },
      { status: 'Принят', color: 'primary' },
      { status: 'Ошибка', color: 'danger' },
      { status: 'Присвоен', color: 'info' },
    ].filter((item) => item.status === sts)[0].color
  }
  return (
    <Container className='query-list-container'>
      <h1 className='display-3 py-1 login_header text-primary'>
        Список запросов
      </h1>

      <Row className='justify-content-end mb-2'>
        <Col sm={2}>
          <FormControl
            as='select'
            size='md'
            name='sport'
            value={activeSport}
            onChange={(e) => setFilter(e)}
          >
            <option>{activeSport}</option>
            {sports.map((sprt, idx) => (
              <option key={sprt + idx}>{sprt.sport}</option>
            ))}
          </FormControl>
        </Col>
        <Col sm={1}>
          <Button size='md' variant='warning' onClick={clearFilter}>
            Очистить
          </Button>
        </Col>
        <Col sm={2}>
          <Button
            size='md'
            variant='primary'
            className='text-white'
            onClick={(e) => onClick(e)}
          >
            Создать PDF <FontAwesomeIcon icon={faFilePdf} transform='right-6' />
          </Button>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col md={12}>
          <Table
            striped
            bordered
            hover
            size='lg'
            variant='dark'
            className='queries-table'
          >
            <thead className='text-white'>
              <tr>
                <th>#</th>
                <th>Спортсмен</th>
                <th>Тренер</th>
                <th>Спорт</th>
                <th>Федерация</th>
                <th>Разряд</th>
                <th>Статус</th>
                <th>Выбрать</th>
              </tr>
            </thead>
            <tbody>
              {dataForPdf !== null &&
                dataForPdf.map(
                  (
                    {
                      name,
                      lastname,
                      secondname,
                      trainer,
                      sport,
                      federation,
                      _id,
                      rank,
                      status,
                    },
                    idx
                  ) => (
                    <tr key={_id} className='text-white'>
                      <td>{idx + 1}</td>
                      <td>
                        {lastname} {name} {secondname}
                      </td>
                      <td>{trainer}</td>
                      <td>{sport}</td>
                      <td>{federation}</td>
                      <td>{rank}</td>
                      <td className={`text-${query_status(status)}`}>
                        {status}
                      </td>
                      <td>
                        <FormCheck data={_id} onChange={(e) => onChange(e)} />
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
}
const mapStateToProps = (state) => ({
  qryLoading: state.queries.loading,
  queries: state.queries.queries,
})
export default connect(mapStateToProps, { getAllQueries })(AdminDashBoard)
