import React, { useEffect } from 'react'
import { Container, Row, Col, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getQueries, deleteQuery } from '../../actions/queries'

const ListQueries = ({
  queriesLoading,
  queries,
  user,
  userLoading,
  getQueries,
  deleteQuery,
}) => {
  useEffect(() => {
    !userLoading && user !== null && getQueries(user.data._id)
  }, [getQueries, user, userLoading])
  const onClick = (e) => {
    deleteQuery(e.target.attributes.data.value)
  }
  return (
    <Container className='query-list-container'>
      <h1 className='display-2 py-1 login_header text-primary'>
        Список запросов
      </h1>
      <Row className='justify-content-md-center'>
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
              {!queriesLoading &&
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
                      <td className='text-warning'>{status}</td>
                      <td>
                        <Link
                          to={`/updatequery/${_id}`}
                          className='btn btn-sm btn-primary'
                        >
                          Изм.
                        </Link>
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
  queriesLoading: state.queries.loading,
  queries: state.queries.queries,
  user: state.auth.user,
  userLoading: state.auth.loading,
})

export default connect(mapStateToProps, { getQueries, deleteQuery })(
  ListQueries
)
