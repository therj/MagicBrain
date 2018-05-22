// Development -- BEGIN
const livereload = require('livereload')
const reload = livereload.createServer()
reload.watch(__dirname + '/server.js')
// How does it work?
// https://stackoverflow.com/questions/45622125/how-can-i-add-live-reload-to-my-nodejs-server/50246338#50246338

// Development -- END

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
  res.json(database.users)
})

app.post('/signin', signin.handleSignIn(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/findface', findface.handleImage(db))
app.post('/imageUrl', findface.handleApiCall())


app.listen(3000, () => {
  console.log('Server Running!')
})
