import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import 'express-async-errors'

import connectDB from './db/connect.js'

import routesNotFoundMiddleware from './middlewares/not-found.js'
import errorHandlerMiddleware from './middlewares/errors-handler.js'

import scraperRouter from './routes/scraperRoutes.js'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/v1', scraperRouter)

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
