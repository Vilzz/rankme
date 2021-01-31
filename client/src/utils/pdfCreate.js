import jsPDF from 'jspdf'
//import 'jspdf-autotable'
import myFont from './roboto.js'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

const generatePDF = (docData) => {
  const pageWidth = 210
  const lineHeight = 1.2
  const leftMargin = 20
  const rightMargin = 10
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    lineHeight,
  })

  doc.setLanguage('ru-RU')
  doc.addFileToVFS('Roboto-Regular.ttf', myFont)
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'Regular')
  doc.setFont('Roboto', 'Regular')

  const date = Date().split(' ')

  const dateStr = date[1] + date[2] + date[3] + date[4]

  doc.text('Приложение №2', 24, 25)
  doc.setFontSize(12)
  doc.text('ПРИЛОЖЕНИЕ № 4', 159, 42)
  doc.text('к распоряжению первого заместителя', 120, 46)
  doc.text('главы городского округа Самара', 131, 50)
  doc.text(
    `от ${format(new Date(), 'dd MMMM yyyy', {
      locale: ru,
    })} г. № __________`,
    131,
    58
  )
  const docHeader = `Список спортсменов городского округа Самара, выполнивших нормы\n и требования Единой всероссийской спортивной классификации\n на 2018-2021 годы по виду спорта "${docData[0].sport}"\n для присвоения ${docData[0].rank}-го спортивного разрядя`

  doc.setFontSize(14)
  doc.text(docHeader, 108, 72, 'center')

  const persons = docData
    .map(
      (data, idx) =>
        `\n${idx + 1}. ${data.lastname} ${data.name} ${data.secondname}, ${
          data.federation
        }, тренер ${data.trainer}\n`
    )
    .join(' ')

  const personText = doc.splitTextToSize(
    persons,
    pageWidth - leftMargin - rightMargin
  )

  doc.setFontSize(12)
  doc.text(personText, leftMargin, 102)
  doc.setFontSize(12)

  const footerText = `Руководитель Департамента\n физической культуры\n и спорта Администрации\n городского округа Самара`
  doc.text(
    footerText,
    leftMargin,
    102 + (personText.length * 10 * lineHeight) / 2
  )
  const topmanager = 'Д.В. Чеканов'
  doc.text(topmanager, 146, 117 + (personText.length * 10 * lineHeight) / 2)
  doc.save(`apendix_${dateStr}.pdf`)
}

export default generatePDF
