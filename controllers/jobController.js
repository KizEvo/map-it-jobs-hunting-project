import Job from '../models/Job.js'
import startBrowser from '../scraper/browser.js'
import startPageScrape from '../scraper/startPageScrape.js'

const getAllJob = async (req, res) => {
  const { title, location, datePosted, companyBusiness } = req.query

  if (!title || title.trim() === '')
    throw new Error('Please provide a job title or keyword')

  const filterJobsObject = {}

  if (title) filterJobsObject.title = { $regex: title, $options: 'i' }

  if (location) filterJobsObject.location = { $regex: location, $options: 'i' }

  if (companyBusiness === 'outsourcing' || companyBusiness === 'product')
    filterJobsObject.companyBusiness = companyBusiness

  let result = Job.find(filterJobsObject)

  if (datePosted === 'oldest') {
    result = result.sort('+datePosted')
  } else {
    result = result.sort('-datePosted')
  }

  const pageNumber = Number(req.query.page) || 1
  const limit = 20

  const skip = (pageNumber - 1) * limit
  result = result.skip(skip).limit(limit)

  const jobs = await result
  res.status(200).json({ jobs })
}

const runCron = async () => {
  const browserInstance = await startBrowser()
  const data = await startPageScrape(browserInstance)

  if (data.length === 1 && data[0].length === 0) {
    console.log('No new job yet.')
  } else {
    saveNewJobs(data)
  }
}

const saveNewJobs = async (data) => {
  try {
    for (let i = 0; i < data.length; i++) {
      await Job.create(data[i])
    }
  } catch (error) {
    console.log(error.message)
  }
}

export { getAllJob, runCron }
