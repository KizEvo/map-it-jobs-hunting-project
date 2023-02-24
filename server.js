import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'

import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'

import connectDB from './db/connect.js'

import routesNotFoundMiddleware from './middlewares/not-found.js'
import errorHandlerMiddleware from './middlewares/errors-handler.js'

import scraperRouter from './routes/scraperRoutes.js'

import cloudinary from 'cloudinary'
import './cron/runCron.js'

cloudinary.v2.config({
  api_key: process.env.CLOUD_API_KEY,
  cloud_name: process.env.CLOUD_API_NAME,
  api_secret: process.env.CLOUD_API_SECRET,
})

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

const __dirname = dirname(fileURLToPath(import.meta.url))
// app.use(express.static(path.resolve(__dirname, './public')))

// NOTE:
// express.static(path.resolve(__dirname, './scraper/scrape_function/image'))
// imageDir inside scrape_functionDir
// is the ROOT of the server when
// sending request to backend
// => http://localhost:5000/sendo-vn-logo.jpg
// to access static file (image, css...)

app.use('/api/v1/jobs', scraperRouter)

app.use(routesNotFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.DB)
    app.listen(port, () => {
      console.log(`Server is running on ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
