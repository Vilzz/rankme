import express from 'express'
import { pdfUpload } from '../controllers/pdf.js'
import { protect, authorise } from '../middleware/authHandler.js'
const router = express.Router()

router.route('/').post(protect, authorise('Admin'), pdfUpload)

export default router
