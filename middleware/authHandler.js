import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import errorResponse from '../utils/errorResponse.js'
import User from '../models/Users.js'

const secret = process.env.JWT_SECRET
const ERROR_MSG = 'Необходимо авторизоваться для доступа к ресурсу'

// Закрываем приватные маршруты от незарегистрированных пользователей
export const protect = asyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) {
    return next(new errorResponse(ERROR_MSG, 401))
  }
  try {
    const decoded = jwt.verify(token, secret)
    req.user = await User.findById(decoded.id).select('role _id')
    next()
  } catch (err) {
    return next(new errorResponse(ERROR_MSG, 401))
  }
})

// Фильтрация доступа взависимости от роли пользователя
export const authorise = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new errorResponse(
          `Ресурс не доступен для пользователя с ролью ${req.user.role}`,
          403
        )
      )
    }
    next()
  }
}
