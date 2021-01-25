import React, { useEffect } from 'react'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllQueries } from '../../actions/queries'
const AdminDashBoard = ({ qryLoading, queries, getAllQueries }) => {
  useEffect(() => {
    getAllQueries()
  }, [getAllQueries])
  const onClick = (e) => {
    console.log(e.target)
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
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!qryLoading &&
                queries !== null &&
                queries.data.map(
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
                        <Button
                          size='sm'
                          variant='primary'
                          onClick={(e) => onClick(e)}
                        >
                          <FontAwesomeIcon icon={faPrint} />
                        </Button>
                      </td>
                      <td>
                        <Button
                          size='sm'
                          data={_id}
                          variant='danger'
                          onClick={(e) => onClick(e)}
                        >
                          Удл.
                        </Button>
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
