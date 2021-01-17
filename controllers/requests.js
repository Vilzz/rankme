import errorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import Requests from '../models/Requests.js'

// @desc    Добавить новый  запрос
// @route   POST /api/v1/requests
// @access  Приватный
export const createRequest = asyncHandler(async (req, res, next) => {
  const request = await Requests.create(req.body)
  res.status(201).json({ success: true, data: request })
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
  request = await Requests.findByIdAndUpdate(id, req.body, {
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
  await request.remove()
  res.status(200).json({ success: true, data: {} })
})
