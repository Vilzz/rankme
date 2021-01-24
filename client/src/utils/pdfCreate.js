import jsPDF from 'jspdf'
import 'jspdf-autotable'
import myFont from './roboto.js'
const generatePDF = (tickets) => {
  // initialize jsPDF
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })
  doc.setLanguage('ru-RU')
  doc.addFileToVFS('Roboto-Regular.ttf', myFont)
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'Regular')
  doc.setFont('Roboto', 'Regular')

  const date = Date().split(' ')
  // we use a date string to generate our filename.
  const dateStr = date[1] + date[2] + date[3]
  // ticket title. and margin-top + margin-left

  doc.text('Приложение №2', 24, 25)
  doc.setFontSize(12)
  doc.text('ПРИЛОЖЕНИЕ № 4', 159, 42)
  doc.text('к распоряжению первого заместителя', 120, 46)
  doc.text('главы городского округа Самара', 131, 50)
  doc.text(`от ${tickets} № ____________`, 131, 58)
  doc.text(
    'Список спортсменов городского округа Самара, выполнивших нормы',
    34,
    78
  )
  doc.text('и требования Единой всероссийской спортивной классификации', 38, 84)
  doc.text('на 2018-2021 годы по виду спорта "Хоккей"', 60, 90)
  doc.text('для присвоения 2-го спортивного разрядя', 60, 96)
  doc.save(`report_${dateStr}.pdf`)
}

export default generatePDF
