import express from 'express'
import {
  getCurrentUser,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
} from '../controllers/auth.js'
const router = express.Router()
import { protect } from '../middleware/authHandler.js'

router.get('/me', protect, getCurrentUser)
router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgotpassword', forgotPassword)
router.put('/resetpassword/:resettoken', resetPassword)
router.put('/updatepassword', protect, updatePassword)
export default router
