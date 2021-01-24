import React from 'react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'
import generatePDF from './utils/pdfCreate.js'
const Createpdf = () => {
  const formated = format(new Date(), 'dd MMMM YYY', { locale: ru })
  return (
    <div>
      <h1>{generatePDF(formated)}</h1>
    </div>
  )
}

export default Createpdf

const tickets = [
  {
    id: 1,
    title: 'Name',
    request: 'Some request',
    status: 'new',
  },
  {
    id: 2,
    title: 'Name2',
    request: 'Some request2',
    status: 'old',
  },
]
