const scrapeJobUrls = async (page) => {
  console.log('Getting job urls...')
  const urls = await page.$$eval('.first-group > div', (elements) => {
    elements = elements.map(
      (element) => element.querySelector('.job__body > div > h3 > a').href
    )
    return elements
  })
  return urls
}

export default scrapeJobUrls
