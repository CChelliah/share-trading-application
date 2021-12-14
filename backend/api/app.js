const express = require('express')
const app = express()
app.use(express.json())

const { shareRoutes } = require('./routes')

app.use('/shares', shareRoutes)

const port = process.env.PORT || 3002
app.listen(port, () => console.log(`Listening on port ${port}...`))
