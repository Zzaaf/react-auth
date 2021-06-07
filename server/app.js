require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const MongoStore = require('connect-mongo')
const { dbConnectionURL, connect } = require('./src/config/db')
const authRouter = require('./src/routes/auth.router')
const usersRouter = require('./src/routes/users.router')

const app = express()

const { PORT, COOKIE_SECRET, COOKIE_NAME } = process.env

// DB CONNTECTION
connect()

// SERVER'S SETTINGS
app.set('cookieName', COOKIE_NAME)

// APP'S MIDDLEWARES
app.use(cors({
  origin: true,
  credentials: true,
}))
app.use(express.json())
app.use(session({
  name: app.get('cookieName'),
  secret: COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: dbConnectionURL,
  }),
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 1e3 * 86400, // COOKIE'S LIFETIME — 1 DAY
  },
}))

// APP'S ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', usersRouter)

app.listen(PORT, () => {
  console.log('Server has been started on PORT ', PORT)
})
