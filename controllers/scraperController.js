import Job from '../models/Job.js'
import startBrowser from '../scraper/browser.js'
import startPageScrape from '../scraper/startPageScrape.js'

const scrapeJobs = async (req, res) => {
  const browserInstance = await startBrowser()
  const data = await startPageScrape(browserInstance)

  if (data.length === 0) throw new Error('Error occured while scraping jobs')

  for (let i = 0; i < data.length; i++) {
    await Job.create(data[i])
  }

  res.status(200).json('scrape job')
}

export default scrapeJobs
