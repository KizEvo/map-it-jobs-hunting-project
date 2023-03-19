import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const jobsGeometryApi = (address) => {
  const requestUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${address}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${process.env.GOOGLE_PLACES_API_KEY}`
  return requestUrl
}

const getJobsGeometry = async (jobs) => {
  let isError = false
  try {
    const jobsGeometryResolved = await Promise.all(
      jobs.map(async (job) => {
        const requestUrl = jobsGeometryApi(job.location)

        const response = await fetch(requestUrl)
        const jobGeometryData = await response.json()

        job.geometry = jobGeometryData.candidates[0].geometry || {}

        return job
      })
    )
    return [jobsGeometryResolved, isError]
  } catch (error) {
    console.log(error)
    isError = true
    return [jobs, isError]
  }
}

export default getJobsGeometry
