import crypto from 'crypto'
import errorResponse from '../utils/errorResponse.js'
import asyncHandler from '../middleware/asyncHandler.js'
import sendEmail from '../utils/sendMail.js'
import User from '../models/Users.js'

//*************************************/
// @desc    Данные текущего пользователя
// @route   POST /api/v1/auth/me
// @access  Приватный
//*************************************/
export const getCurrentUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  res.status(200).json({
    success: true,
    data: user,
  })
})

//*************************************/
// @desc    Регистрация пользователя
// @route   POST /api/v1/auth/register
// @access  Публичный
//*************************************/
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body
  // Создаем пользователя
  const user = await User.create({
    name,
    email,
    password,
    role,
  })
  sendtokenResponse(user, 200, res)
})

//*************************************/
// @desc    Вход пользователя
// @route   POST /api/v1/auth/login
// @access  Публичный
//*************************************/
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    return next(
      new errorResponse('Отсутствует адрес электронной почты или пароль'),
      400
    )
  }
  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    return next(new errorResponse('Данные пользователя не верны'), 401)
  }

  const isMatch = await user.matchPassword(password)

  if (!isMatch) {
    return next(new errorResponse('Данные пользователя не верны'), 401)
  }
  sendtokenResponse(user, 200, res)
})

//*************************************/
// @desc    Выход пользователя / Очистка куки
// @route   GET /api/v1/auth/logout
// @access  Приватный
//*************************************/
export const logout = asyncHandler(async (req, res, next) => {
  const name = req.name
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.status(200).json({
    success: true,
    data: name,
  })
})

//*************************************/
// @desc    Изменить пароль
// @route   PUT /api/v1/auth/updatepassword
// @access  Приватный
//*************************************/
export const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password')
  const oldPass = req.body.currentPassword
  const newPass = req.body.newPassword
  if (!oldPass) {
    return next(new errorResponse('Необходимо указать старый пароль', 400))
  }
  if (!newPass) {
    return next(new errorResponse('Необходимо указать новый пароль', 400))
  }
  if (newPass === oldPass) {
    return next(
      new errorResponse('Новый пароль должен отличаться от старого', 400)
    )
  }
  if (!(await user.matchPassword(oldPass))) {
    return next(new errorResponse('Неверный пароль', 401))
  }
  user.password = newPass
  await user.save()

  sendtokenResponse(user, 200, res)
})

//*************************************/
// @desc    Забытый пароль
// @route   POST /api/v1/auth/forgotpassword
// @access  Публичный
//*************************************/
export const forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    return next(
      new errorResponse(
        'Для выполнения запроса необходимо добавить электронную почту',
        500
      )
    )
  }
  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return next(
      new errorResponse(
        `Пользователь с электронной почтой ${req.body.email} не существует!`,
        404
      )
    )
  }
  // Get a reset token
  const resetToken = user.getResetPasswordToken()
  await user.save({ validateBeforeSave: false })
  // Create reset url
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/auth/resetpassword/${resetToken}`
  const message = `Вы получили это письмо, потому что вы или кто-то запросил сброс пароля. Для смены пароля сделайте PUT запрос на адрес: \n\n ${resetUrl}`
  try {
    await sendEmail({
      email: user.email,
      subject: 'Токен сброса пароля',
      message,
    })
    res.status(200).json({
      success: true,
      data: 'Письмо для смены пароля отправлено на ваш электронный адрес',
    })
  } catch (err) {
    console.log(err)
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    await user.save({ validateBeforeSave: false })
    return next(new errorResponse('Письмо не может быть отправлено', 500))
  }
})

//*************************************/
// @desc    Сброс пароля
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Публичный
//*************************************/
export const resetPassword = asyncHandler(async (req, res, next) => {
  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex')

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  })
  if (!user) {
    return next(new errorResponse('Неверный токен для сброса пароля', 400))
  }

  // Set new password
  user.password = req.body.password
  user.resetPasswordToken = undefined
  user.resetPasswordExpire = undefined
  await user.save()

  sendtokenResponse(user, 200, res)
})

const sendtokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken()
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }
  if (process.env.NODE_ENV === 'production') {
    options.secure = false
  }
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  })
}
