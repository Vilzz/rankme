import { useState } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'

const UpdateStatus = ({
  status,
  id,
  statusArray,
  query_status,
  refreshStatus,
}) => {
  const [modalShow, setModalShow] = useState(false)
  const [newStatus, setNewStatus] = useState(status)

  const onSubmit = (e) => {
    e.preventDefault()
    refreshStatus(newStatus, id)
    setModalShow(false)
  }
  return (
    <>
      <Button
        size='sm'
        variant={query_status(newStatus)}
        onClick={() => setModalShow(true)}
        className={newStatus === 'Создан' ? 'text-dark' : 'text-white'}
      >
        {newStatus}
      </Button>
      <Modal
        size='sm'
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby='modal'
        animation={false}
        dialogClassName='change-status-modal'
      >
        <Modal.Header>
          <Modal.Title id='modal' className='text-dark' as='h5'>
            Изменить статус заявки
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Control
              as='select'
              size='sm'
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              <option className='modal-option'>{newStatus}</option>
              {statusArray
                .filter((st) => st.status !== newStatus)
                .map((st) => (
                  <option key={st.status}>{st.status}</option>
                ))}
            </Form.Control>
            <Row className='mt-3'>
              <Col xs={6}>
                <div className='d-grid'>
                  <Button variant='primary' type='submit' size='sm'>
                    Изменить
                  </Button>
                </div>
              </Col>

              <Col xs={6}>
                <div className='d-grid'>
                  <Button
                    variant='secondary'
                    type='button'
                    size='sm'
                    onClick={() => setModalShow(false)}
                  >
                    Закрыть
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default UpdateStatus
