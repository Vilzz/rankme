import mongoose from 'mongoose'
import crypto from 'crypto'
import slugify from 'slugify'
import errorResponse from '../utils/errorResponse.js'

const RequestsSchema = new mongoose.Schema({
  unq: {
    type: String,
  },
  createdby: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Требуется ID пользователя'],
  },
  changedby: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, 'Требуется добавить имя'],
  },
  secondname: {
    type: String,
    required: [true, 'Требуется добавить отчество'],
  },
  lastname: {
    type: String,
    required: [true, 'Требуется добавить фамилию'],
  },
  trainer: {
    type: String,
  },
  sport: {
    type: String,
    required: [true, 'Требуется добавить вид спорта'],
  },
  federation: {
    type: String,
  },
  rank: {
    type: String,
    enum: ['1', '2', '3'],
    required: [true, 'Требуется добавить разряд'],
  },
  docs: {
    type: [String],
  },
  status: {
    type: String,
    enum: ['Создан', 'Ошибка', 'Принят', 'Присвоен'],
    default: 'Создан',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  assignedDate: {
    type: Date,
  },
})
RequestsSchema.pre('save', async function (next) {
  const unqstr = `${this.name}${this.secondname}${this.lastname}${this.rank}`
  const hashed = crypto.createHash('sha256').update(unqstr).digest('hex')
  const check = await this.model('Requests').findOne({ unq: hashed })
  if (check) {
    return next(
      new errorResponse(
        `Запрос на получение ${this.rank} разряда для ${this.name} ${this.secondname} ${this.lastname} уже создан`,
        409
      )
    )
  }
  this.unq = hashed
  next()
})

const Requests = mongoose.model('Requests', RequestsSchema)

export default Requests
