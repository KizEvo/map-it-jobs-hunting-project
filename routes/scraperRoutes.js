import express from 'express'
const router = express.Router()

import { scrapeJobs } from '../controllers/scraperController.js'

router.get('/scrapeJobs', scrapeJobs)

export default router
