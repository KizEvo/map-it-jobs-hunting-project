import getAllJobsInfo from './scrape_function/scrapeJobInfo.js'
import scrapeJobUrls from './scrape_function/scrapeJobUrls.js'

const pageScraperController = async (browser) => {
  const jobStack = []
  try {
    console.log('Opening page...')
    let page = await browser.newPage()

    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    )

    await page.goto(process.env.URL_TO_SCRAPE)

    // await page.waitForSelector('.pagination')

    // const paginationNumber = await page.$eval(
    //   '.search-page__jobs-pagination > ul > li:nth-child(4) > a',
    //   (element) => element.textContent
    // )

    for (let i = 0; i < 2; i++) {
      const jobUrls = await scrapeJobUrls(page)
      const jobData = await getAllJobsInfo(jobUrls, browser)

      jobStack.push(jobData)

      console.log('Navigating to new pagination...')
      // ? Navigation but can't use Promise.all with page.waitForNavigation ?
      await page.click('.pagination > li:last-child > a')
    }
  } catch (error) {
    console.log(error.message)
  } finally {
    console.log('Finished, closing browser...')
    await browser.close()
    return jobStack
  }
}

export default pageScraperController
