import express from 'express'
import { createRequest, getRequests } from '../controllers/requests.js'
import advancedResults from '../middleware/advancedResults.js'
import { protect, authorise } from '../middleware/authHandler.js'
import Requests from '../models/Requests.js'
const router = express.Router()

router
  .route('/')
  .get(advancedResults(Requests), getRequests)
  .post(protect, authorise('Admin'), createRequest)

export default router
