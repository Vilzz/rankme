import React, { useEffect, useState } from 'react'
import UpdateStatus from './UpdateStatus.jsx'
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
import { faFilePdf, faRecycle } from '@fortawesome/free-solid-svg-icons'

import { connect } from 'react-redux'
import { getAllQueries } from '../../actions/queries'

const AdminDashBoard = ({ qryLoading, queries, getAllQueries }) => {
  const [dataForPdf, setDataForPdf] = useState([])
  const [activeFilter, setActiveFilter] = useState({
    sport: 'Выбери спорт',
    rank: 'Выбери разряд',
    status: 'Выбери статус',
  })
  const [filters, setFilters] = useState('')
  const ranks = ['1', '2', '3']
  const statusArray = [
    { status: 'Создан', color: 'warning' },
    { status: 'Принят', color: 'primary' },
    { status: 'Ошибка', color: 'danger' },
    { status: 'Присвоен', color: 'info' },
  ]
  useEffect(() => {
    getAllQueries(filters)
  }, [getAllQueries, filters])

  useEffect(() => {
    const qryData =
      !qryLoading && queries !== null
        ? queries.data.map((query) => {
            return { ...query, grouped: false }
          })
        : []

    setDataForPdf([...qryData])
  }, [qryLoading, queries, filters])

  const onClick = (e) => {
    const prePdf = dataForPdf.filter((dt) => dt.grouped === true)
    prePdf.length > 0 && pdfCreate(prePdf)
  }

  const onChange = (e) => {
    const tmpArray = [...dataForPdf]
    const idx = dataForPdf.findIndex(
      (dt) => dt._id === e.target.attributes.data.value
    )
    tmpArray[idx].grouped = !tmpArray[idx].grouped
    setDataForPdf([...tmpArray])
  }

  const filtersOn = (e) => {
    setActiveFilter({ ...activeFilter, [e.target.name]: e.target.value })
    filters === ''
      ? setFilters(`${filters}?${e.target.name}=${e.target.value}`)
      : setFilters(`${filters}&${e.target.name}=${e.target.value}`)
  }

  const filterOff = () => {
    setActiveFilter({
      sport: 'Выбери спорт',
      rank: 'Выбери разряд',
      status: 'Выбери статус',
    })
    setFilters('')
  }
  const query_status = (sts) => {
    return statusArray.filter((item) => item.status === sts)[0].color
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
            name='status'
            value={activeFilter.status}
            className='mb-2'
            onChange={(e) => filtersOn(e)}
          >
            <option>{activeFilter.status}</option>
            {statusArray
              .filter(({ status }) => status !== activeFilter.status)
              .map(({ status }) => (
                <option key={status}>{status}</option>
              ))}
          </FormControl>
        </Col>
        <Col sm={2}>
          <FormControl
            as='select'
            size='md'
            name='rank'
            value={activeFilter.rank}
            className='mb-2'
            onChange={(e) => filtersOn(e)}
          >
            <option>{activeFilter.rank}</option>
            {ranks
              .filter((rank) => rank !== activeFilter.rank)
              .map((rank) => (
                <option key={rank}>{rank}</option>
              ))}
          </FormControl>
        </Col>
        <Col sm={2}>
          <FormControl
            as='select'
            size='md'
            name='sport'
            value={activeFilter.sport}
            className='mb-2'
            onChange={(e) => filtersOn(e)}
          >
            <option>{activeFilter.sport}</option>
            {sports.map(({ sport }, idx) => (
              <option key={sport + idx}>{sport}</option>
            ))}
          </FormControl>
        </Col>
        <Col sm={2}>
          <Button
            size='md'
            variant='warning'
            onClick={filterOff}
            className='mb-2'
          >
            Очистить <FontAwesomeIcon icon={faRecycle} transform='right-5' />
          </Button>
        </Col>
        <Col sm={2}>
          <Button
            size='md'
            variant='info'
            className='text-white'
            onClick={(e) => onClick(e)}
          >
            Создать PDF <FontAwesomeIcon icon={faFilePdf} transform='right-5' />
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
                <th>Результат</th>
                <th>Федерация</th>
                <th>Дата</th>
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
                      createdDate,
                      _id,
                      rank,
                      status,
                      docs,
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
                      <td>
                        {docs.length > 0 ? (
                          docs.map((doc, idx) => (
                            <a href={`/${doc.toString()}`} key={idx}>{`Файл-${
                              idx + 1
                            }`}</a>
                          ))
                        ) : (
                          <h5>Нет данных</h5>
                        )}
                      </td>
                      <td>{federation}</td>
                      <td>
                        {format(new Date(createdDate), 'dd MMMM yyyy', {
                          locale: ru,
                        })}
                      </td>
                      <td>{rank}</td>
                      <td className={`text-${query_status(status)}`}>
                        <UpdateStatus status={status} />
                      </td>
                      <td>
                        <FormCheck
                          data={_id}
                          checked={
                            dataForPdf.filter((dt) => dt._id === _id)[0].grouped
                          }
                          onChange={(e) => onChange(e)}
                        />
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
