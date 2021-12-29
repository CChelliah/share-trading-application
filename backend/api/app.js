const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())

const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

const { shareRoutes } = require('./routes')

app.use('/shares', shareRoutes)

const port = process.env.PORT || 3002
app.listen(port, () => console.log(`Listening on port ${port}...`))
