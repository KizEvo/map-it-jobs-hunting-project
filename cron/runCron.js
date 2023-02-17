import cron from 'node-cron'
import { runCron } from '../controllers/jobController.js'

cron.schedule('0 */25 * * * *', () => {
  console.log('Running cron')
  runCron()
})

// 0 */20 * * * * - every 20 mins
// 00 30 23 * * 1-5 - At 23:30 on every day-of-week from Monday through Friday.
