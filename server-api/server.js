const PORT = process.env.PORT || 3000
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const pg = require('pg')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const findface = require('./controllers/findface')
app = express()
  .use(cors())
  .use(express.static(__dirname + '/public'))
  .use(bodyParser.json())
  .use(
    bodyParser.urlencoded({
      extended: false,
    }),
  )

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'magicbrain',
  },
})

app.get('/', (req, res) => {
  res.json('It is working!')
})

app.post('/signin', signin.handleSignIn(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/findface', findface.handleImage(db))
app.post('/imageUrl', findface.handleApiCall())

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT} !`)
})
