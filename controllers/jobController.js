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

  const totalJobs = await Job.countDocuments(filterJobsObject)
  const totalPages = Math.ceil(totalJobs / limit)

  const jobs = await result
  res.status(200).json({ jobs, totalPages })
}

const runCron = async () => {
  const browserInstance = await startBrowser()
  await startPageScrape(browserInstance)
}

const saveNewJobs = async (data) => {
  let isError = false
  try {
    for (let i = 0; i < data.length; i++) {
      await Job.create(data[i])
    }
  } catch (error) {
    console.log(error)
    isError = true
    return isError
  }
  return isError
}

export { getAllJob, runCron, saveNewJobs }
