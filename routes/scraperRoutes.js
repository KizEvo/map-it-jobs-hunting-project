import express from 'express'
const router = express.Router()

import { getAllJob } from '../controllers/jobController.js'

router.get('/', getAllJob)

export default router
