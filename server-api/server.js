// Development -- BEGIN
const livereload = require('livereload')
const reload = livereload.createServer()
reload.watch(__dirname + '/server.js')
// Development -- END

const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const pg = require('pg')
const knex = require('knex')
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
/**********
TEMP: TEST DATABASE CONN
db
  .select('*')
  .from('users')
  .then(data => {
    console.log(data)
  })
*********/
app.get('/', (req, res) => {
  res.json(database.users)
})

app.post('/signin', (req, res) => {
  db.select('email', 'hash')
    .where("email", '=', req.body.email)
    .from('login')
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          }).catch(err => res.status(400).json('Unable to get User'))
      } else {
        res.status(400).json('Incorrect Credentials!')
      }
    }).catch(err => res.status(400).json('Incorrect Credentials!'))



})

/******************************** 
 REGISTER
********************************/
app.post('/register', (req, res) => {
  const {
    name,
    email,
    password
  } = req.body

  const hash = bcrypt.hashSync(password);

  db.transaction(trx => {
    trx.insert({
        email: email,
        hash: hash
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then(user => {
            res.json(user[0])
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  }).catch(err => res.status(400).json('Unable to register!'))
})

app.get('/profile/:id', (req, res) => {
  const {
    id
  } = req.params
  db.select('*')
    .from('users')
    .where({
      id
    })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json("Not Found!")
      }
    }).catch(err => res.status(400).json("Error Getting User"))
})

app.put('/findface', (req, res) => {
  const {
    id
  } = req.body

  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0])
    }).catch(err => {
      res.status(400).json("Unable to get entries")
    })

})

// // dsfghjkdsfgh
// bcrypt.hash("bacon", null, null, function (err, hash) {
//     // Store hash in your password DB.
// });

// Load hash from your password DB.

// bcrypt.compare("veggies", hash, function (err, res) {
//     // res = false
// });

// // awertyuidsfgh

app.listen(3000, () => {
  console.log('Server Running!')
})
