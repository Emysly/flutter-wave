import express from 'express'
import dotenv from 'dotenv'
import 'colors'

import validationRoutes from './routes/validationRoutes.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'

dotenv.config()

const app = express()

app.use(express.json())

app.use('/', validationRoutes)

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
