import express from 'express'
import { createRequest } from '../controllers/requests.js'
const router = express.Router()
import { protect, authorise } from '../middleware/authHandler.js'

router.route('/').post(protect, authorise('Admin'), createRequest)

export default router
