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
