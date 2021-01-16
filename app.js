import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'
import hpp from 'hpp'
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js'

import morgan from 'morgan'
import colors from 'colors'

import connectDB from './config/db.js'
import auth from './routes/auth.js'

dotenv.config({ path: './config/config.env' })
connectDB()
const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.static(path.join(path.resolve(), 'public')))
app.use(fileUpload())
app.use(express.json())
app.use(cookieParser())
app.use(mongoSanitize())
app.use(helmet())
app.use(xss())
const limiter = rateLimiter({
  windowMs: 10 * 60 * 1000, //10 мин
  max: 100,
})
app.use(limiter)
app.use(hpp())
app.use(cors())

app.use('/api/v1/auth', auth)

app.use(errorHandler)
const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () =>
  console.log(
    colors.brightCyan.bold.italic(
      `Сервер запущен на порту ${PORT}, режим "${process.env.NODE_ENV}"`
    )
  )
)
process.on('unhandledRejection', (err, promise) => {
  console.log(`Ошибка: ${err.message}`)
  server.close(() => process.exit(1))
})
