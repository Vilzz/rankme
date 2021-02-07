import React from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap'

const popover = (
  <Popover id='popover-basic'>
    <Popover.Title as='h5' className='text-dark'>
      Изменить статус
    </Popover.Title>
    <Popover.Content>Список статусов</Popover.Content>
  </Popover>
)

const UpdateStatus = ({ status }) => {
  return (
    <OverlayTrigger trigger='click' placement='left' overlay={popover}>
      <span style={{ cursor: 'pointer' }}>{status}</span>
    </OverlayTrigger>
  )
}

export default UpdateStatus
