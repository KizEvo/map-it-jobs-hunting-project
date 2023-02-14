import Job from '../../models/Job.js'

const checkForJobsInDb = async (job) => {
  try {
    const isJobExist = await Job.findOne({ title: job.title })
    if (isJobExist) return [true, undefined]
  } catch (error) {
    return [true, error.message]
  }
  return [false, undefined]
}

export default checkForJobsInDb
