import cron from 'node-cron'
import { runCron } from '../controllers/scraperController.js'

cron.schedule('0 */10 * * * *', () => {
  console.log('Running cron')
  runCron()
})
