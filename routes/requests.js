import express from 'express'
import {
  createRequest,
  getRequests,
  getRequest,
  updateRequest,
  deleteRequest,
} from '../controllers/requests.js'
import advancedResults from '../middleware/advancedResults.js'
import { protect, authorise } from '../middleware/authHandler.js'
import Requests from '../models/Requests.js'
const router = express.Router()

router
  .route('/')
  .get(
    advancedResults(Requests, { path: 'createdby', select: 'role name _id' }),
    getRequests
  )
  .post(protect, authorise('User', 'Admin'), createRequest)

router
  .route('/:id')
  .get(getRequest)
  .put(protect, authorise('User', 'Admin'), updateRequest)
  .delete(protect, authorise('User', 'Admin'), deleteRequest)

export default router
