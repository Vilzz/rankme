import errorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import fs from 'fs'
import path from 'path'
import Requests from '../models/Requests.js'

// @desc    Добавить новый  запрос
// @route   POST /api/v1/requests
// @access  Приватный
export const createRequest = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new errorResponse('Добавь pdf файл', 400))
  }
  const fromBody = JSON.parse(req.body.person)
  const folder = fromBody.createdby || 'pdf'

  if (!fs.existsSync(`.${process.env.FILE_UPLOAD_PATH}/${folder}`)) {
    fs.mkdirSync(`.${process.env.FILE_UPLOAD_PATH}/${folder}`)
  }
  const file = req.files.file
  if (file.mimetype.split('/')[1] !== 'pdf') {
    return next(new errorResponse('Требуются файлы в формате pdf', 400))
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

  const request = await Requests.create({
    ...fromBody,
    docs: [`${folder}/${newname}`],
  })

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
        res.status(201).json({
          success: true,
          data: request,
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
      res.status(201).json({
        success: true,
        data: request,
      })
    })
  }
})

// @desc    Получить список запросов
// @route   GET /api/v1/requests
// @access  Публичный
export const getRequests = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults)
})
// @desc    Получить определенный запрос
// @route   GET /api/v1/requests/:id
// @access  Публичный
export const getRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const request = await Requests.findById(id)
  if (!request) {
    return next(new errorResponse('Запрос не найден', 404))
  }
  res.status(200).json({ success: true, data: request })
})

// @desc    Изменить данные запроса
// @route   PUT /api/v1/requests/:id
// @access  Приватный
export const updateRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  let request = await Requests.findById(id)
  if (!request) {
    return next(new errorResponse(`Запрос с ID: ${id} не найден`, 404))
  }
  const fromBody = JSON.parse(req.body.person)
  const folder = fromBody.changedby
  if (
    req.files &&
    fs.existsSync(`.${process.env.FILE_UPLOAD_PATH}/${request.docs[0]}`)
  ) {
    fs.unlink(`.${process.env.FILE_UPLOAD_PATH}/${request.docs[0]}`, (err) => {
      if (err) {
        return next(new errorResponse('Невозможно удалить pdf файл', 500))
      }
    })
  }
  if (req.files) {
    if (!fs.existsSync(`.${process.env.FILE_UPLOAD_PATH}/${folder}`)) {
      fs.mkdirSync(`.${process.env.FILE_UPLOAD_PATH}/${folder}`)
    }
    const file = req.files.file
    if (file.mimetype.split('/')[1] !== 'pdf') {
      return next(new errorResponse('Требуются файлы в формате pdf', 400))
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

    const request = await Requests.findByIdAndUpdate(
      id,
      {
        ...fromBody,
        docs: [`${folder}/${newname}`],
      },
      {
        new: true,
        runValidators: true,
      }
    )
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
            data: request,
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
          data: request,
        })
      })
    }
  } else {
    const request = await Requests.findByIdAndUpdate(id, fromBody, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ success: true, data: request })
  }
})
// @desc    Удалить данные запроса
// @route   POST /api/v1/requests/:id
// @access  Приватный
export const updateStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const request = await Requests.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(200).json({ success: true, data: request })
})

// @desc    Удалить данные запроса
// @route   DELETE /api/v1/requests/:id
// @access  Приватный
export const deleteRequest = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const request = await Requests.findById(id)
  if (!request) {
    return next(new errorResponse(`Запрос с  ID: ${id} не найден`, 404))
  }
  if (fs.existsSync(`.${process.env.FILE_UPLOAD_PATH}/${request.docs[0]}`)) {
    fs.unlink(`.${process.env.FILE_UPLOAD_PATH}/${request.docs[0]}`, (err) => {
      if (err) {
        return next(new errorResponse('Невозможно удалить pdf файл', 500))
      }
    })
  }
  await request.remove()
  res.status(200).json({ success: true, data: {} })
})
