import { checkForCompanyInDb } from '../scraper/scrape_function/jobValidate.js'
import cloudinary from 'cloudinary'

const uploadImage = async (url, company) => {
  try {
    const isCompanyNameIncludePeriod = company.includes('.')
    if (isCompanyNameIncludePeriod) company = company.split(' ').shift()
    else company = company.split(' ').join('')

    const imageProps = await cloudinary.v2.uploader.upload(url, {
      public_id: company,
      overwrite: true,
      folder: 'mapjobs',
    })
    return [imageProps, undefined]
  } catch (error) {
    return [false, error.message]
  }
}

const deleteCloudinaryAssets = async (jobs) => {
  let isError = false
  try {
    const publicIds = []

    for (let i = 0; i < jobs.length; i++) {
      const isJobExistInDb = await checkForCompanyInDb(jobs[i])
      if (isJobExistInDb) continue

      const imagePathSplitted = jobs[i].companyLogo.split('/')
      const imageNameWithFileExtension = imagePathSplitted.pop()
      const imageFolderName = imagePathSplitted.pop()

      const imageName = imageNameWithFileExtension.split('.').shift()

      const tempStorage = [imageFolderName, imageName]
      const imagePublicId = tempStorage.join('/')

      publicIds.push(imagePublicId)
    }

    if (publicIds.length > 0)
      await cloudinary.v2.api.delete_resources(publicIds)

    return isError
  } catch (error) {
    console.log(error)
    isError = true
    return isError
  }
}

export { uploadImage, deleteCloudinaryAssets }
