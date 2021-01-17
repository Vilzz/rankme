import fs from 'fs'
import errorResponse from '../utils/errorResponse.js'
import path from 'path'

export const pdfUpload = (req, res, next) => {
  if (!req.files) {
    return next(new errorResponse('Добавь pdf файл', 400))
  }
  const folder = req.body.folder || 'pdf'

  if (!fs.existsSync(`.${process.env.FILE_UPLOAD_PATH}/${folder}`)) {
    fs.mkdirSync(`.${process.env.FILE_UPLOAD_PATH}/${folder}`)
  }
  const file = req.files.file
  if (file.mimetype.split('/')[1] !== 'pdf') {
    return next(new errorResponse('Требуются в фалы в формате pdf', 400))
  }
  if (file.size > process.env.MAX_FILE_UPLOAD_SIZE) {
    return next(
      new errorResponse(
        `Допустимый размер файла не более ${process.env.MAX_FILE_UPLOAD_SIZE}B`,
        400
      )
    )
  }
  const newname = `${req.user._id}.${path.parse(file.name).name}${
    path.parse(file.name).ext
  }`
  const fullpath = `${process.env.FILE_UPLOAD_PATH}/${folder}/${newname}`

  if (fs.existsSync(`.${fullpath}`)) {
    fs.unlink(`.${fullpath}`, (err) => {
      if (err) {
        return next(new errorResponse('Невозможно удалить pdf файл', 500))
      }
      file.mv(`.${fullpath}`, (err) => {
        if (err) {
          console.log(err)
          return next(
            new errorResponse(`Проблема при загрузке файла ${file.name}`, 500)
          )
        }
        res.status(200).json({
          success: true,
          data: fullpath,
        })
      })
    })
  } else {
    file.mv(`.${fullpath}`, (err) => {
      if (err) {
        console.log(err)
        return next(
          new errorResponse(`Проблема при загрузке файла ${file.name}`, 500)
        )
      }
      res.status(200).json({
        success: true,
        data: fullpath,
      })
    })
  }
}
