import checkForJobsInDb from './checkForExistingJobsInDB.js'

const getAllJobsInfo = async (jobUrls, browser) => {
  const jobInfoData = []
  for (let i = 0; i < jobUrls.length; i++) {
    const singleJobInfo = await singleJobPromise(jobUrls[i], browser)

    const [isJobInDb, errorMessage] = await checkForJobsInDb(singleJobInfo)
    if (isJobInDb) {
      const message = errorMessage || 'Job already in database, stop scraping'
      console.log(message)
      return [jobInfoData, true]
    }

    jobInfoData.push(singleJobInfo)
    console.log(`Finished scraping the ${i + 1} job`)
  }
  return [jobInfoData, false]
}

const singleJobPromise = async (url, browser) => {
  let newPage = await browser.newPage()

  await newPage.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
  )

  await newPage.goto(url)

  const jobInfo = {}

  jobInfo.company = await newPage.$eval('.job-details__sub-title', (element) =>
    element.textContent.replace(/\n/g, '')
  )
  jobInfo.companyBusiness = await newPage.$eval(
    '.employer-long-overview__basic-info > div:nth-child(1) > div',
    (element) => element.textContent
  )
  jobInfo.companyLocation = await newPage.$eval(
    '.employer-long-overview__basic-info > svg',
    (element) => {
      const companyLocationElement = element.nextElementSibling.children[1]
      return companyLocationElement.textContent.replace(/\n/g, '')
    }
  )
  jobInfo.location = await newPage.$eval(
    '.job-details__overview > div:nth-child(3) > div > span',
    (element) => element.textContent
  )
  jobInfo.jobBenefits = await newPage.$$eval(
    '.job-details__top-reason-to-join-us > ul > li',
    (elements) => {
      elements = elements.map((element) => element.textContent)
      return elements
    }
  )

  const scriptElement = await newPage.$('script[type="application/ld+json"]')
  const jsonString = await newPage.evaluate(
    (element) => element.innerText,
    scriptElement
  )
  const result = JSON.parse(jsonString)

  jobInfo.title = result.title.trim()

  const expireDate = result.validThrough.split('-').map((date) => Number(date))
  jobInfo.expireAt = new Date(
    expireDate[0],
    expireDate[1] - 1,
    expireDate[2] + 1
  )

  const createDate = result.datePosted.split('-').map((date) => Number(date))
  jobInfo.datePosted = new Date(
    createDate[0],
    createDate[1] - 1,
    createDate[2] + 1
  )

  const jobCompanyPage = await newPage.$eval(
    '.employer-long-overview__jobs > a',
    (element) => element.href
  )
  await newPage.goto(jobCompanyPage)

  try {
    const webUrl = await newPage.$eval(
      '.company-content > div > ul > div > li:last-child > div',
      (element) => {
        return element.getAttribute('data-redirect-url-url-value')
      }
    )
    jobInfo.companyWebsite = webUrl
  } catch (error) {
    jobInfo.companyWebsite = 'Unknown'
  }

  await newPage.close()

  return new Promise((resolve, reject) => {
    resolve(jobInfo)
  })
}

export default getAllJobsInfo
