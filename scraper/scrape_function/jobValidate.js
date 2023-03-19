import { uploadImage } from '../../utils/cloudinary.js'
import Job from '../../models/Job.js'

const jobValidate = async (jobInfo) => {
  try {
    const jobInDb = await checkForJobsInDb(jobInfo)

    if (jobInDb) throw new Error('Job found in db, existing..')

    const companyInDb = await checkForCompanyInDb(jobInfo)

    if (companyInDb) {
      jobInfo.companyLogo = companyInDb.companyLogo
      return [jobInfo, undefined]
    }

    const [imageProps, cloudErrMsg] = await uploadImage(
      jobInfo.companyLogo,
      jobInfo.company
    )

    if (!imageProps) throw new Error(cloudErrMsg)

    jobInfo.companyLogo = imageProps.secure_url
    return [jobInfo, undefined]
  } catch (error) {
    return [false, error.message]
  }
}

const checkForJobsInDb = async (job) => {
  const jobInDb = await Job.findOne({
    title: job.title,
    company: job.company,
  })
  if (jobInDb) return jobInDb

  return false
}

const checkForCompanyInDb = async (job) => {
  const companyInDb = await Job.findOne({
    company: job.company,
  })
  if (companyInDb) return companyInDb

  return false
}

export { jobValidate, checkForCompanyInDb }
