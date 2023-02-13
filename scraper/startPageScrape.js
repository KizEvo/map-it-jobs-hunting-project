import pageScraperController from './pageScraperController.js'

const startPageScrape = async (browserInstance) => {
  const result = await pageScraperController(browserInstance)
  return result
}

export default startPageScrape
