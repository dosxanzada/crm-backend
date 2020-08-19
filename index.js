const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser')
const socket = require('socket.io')()
const routes = require('./routes')
const cors = require('cors')
const path = require('path')
const helmet = require('helmet')
const jwt = require('express-jwt')

require('./config/passport')
require('./config/db')
require('./ecosystem.config')

const port = process.env.PORT || 3000
const app = express()

const auth = jwt({
  // secret: process.env.SECRET,
  secret: 'shhhhhhared-secret',
  userProperty: 'payload'
})

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.get('/', (req, res) => {
  const help = `
  <pre>
    Welcome to the NodeJS REST API Web Server!
  </pre>`

  res.send(help)
})

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(auth.unless({ path: [/\/api\/auth/i, /\/null/, /\/favicon.ico/, /\/uploads/i] }))
app.use('/api', routes)

const s = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})

// web socket enabling
app.io = socket
socket.attach(s)
