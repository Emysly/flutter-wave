import express from 'express'
const router = express.Router()
import { getData, validateData } from '../controller/validationController.js'

router.route('/').get(getData)
router.route('/validate-rule').post(validateData)

export default router
