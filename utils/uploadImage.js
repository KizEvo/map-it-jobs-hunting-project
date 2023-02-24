import cloudinary from 'cloudinary'

const uploadImage = async (url) => {
  try {
    const imageProps = await cloudinary.v2.uploader.upload(url, {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'mapjobs',
    })
    return [imageProps, undefined]
  } catch (error) {
    return [false, error.message]
  }
}

export default uploadImage
