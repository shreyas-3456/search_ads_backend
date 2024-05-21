require('dotenv').config()
// Handles async errors (try and catch in the controllers)
require('express-async-errors')

const express = require('express')
const connectDB = require('./db/connect')
const helmet = require('helmet')
const cors = require('cors')

const searchRouter = require('./routes/searchAdsRoute')

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
const port = process.env.PORT || 5000

const notFoundMiddleware = require('./middleware/not-found')

// Routes
app.use('/api/v1', searchRouter)
// middleware
app.use(notFoundMiddleware)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()

//text
