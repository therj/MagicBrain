// Development -- BEGIN
const livereload = require('livereload')
const reload = livereload.createServer()
reload.watch(__dirname + '/server.js');
// Development -- END

// TEMPORARY USER LIST
const database = {
    users: [{
        id: '123',
        name: 'john',
        email: 'john@gmail.com',
        password: 'cookies',
        entries: 0,
        joined: new Date()
    }, {
        id: '124',
        name: 'Sally',
        email: 'sally@gmail.com',
        password: 'bananas',
        entries: 0,
        joined: new Date()
    }]
}

// TEMPORARY USER LIST -- END


const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
app = express()
    .use(cors())
    .use(express.static(__dirname + '/public'))
    .use(bodyParser.json())
    .use(
        bodyParser.urlencoded({
            extended: false,
        }),
    )

app.get('/', (req, res) => {
    res.json(database.users)

})


let hash = '$2a$10$gv/Fb7eaglcEgTYM46umP.pA8Mno/ytnNNaf2cx3aOEo1DGj7S5YO';

app.post('/signin', (req, res) => {
    bcrypt.compare("jakarta", hash, function (err, res) {
        console.log('first guess', res);
    });

    bcrypt.compare("bacon", hash, function (err, res) {
        console.log('second guess', res);
    });

    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('Success');
    } else {
        res.status(400).json("Error Logging In")
    }
})

/******************************** 
 REGISTER
********************************/
app.post('/register', (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    bcrypt.hash(password, null, null, function (err, hash) {
        console.log(hash)
    });

    database.users.push({
        id: '125',
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        entries: 0,
        joined: new Date()
    })

    res.json(database.users[database.users.length - 1])
})

app.get('/profile/:id', (req, res) => {
    const {
        id
    } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user)
        }
    })
    if (!found) {
        res.status(400).json("Not Found")
    }
})

app.post('/image', (req, res) => {
    const {
        id
    } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user)
        }
    })
    if (!found) {
        res.status(400).json("Not Found")
    }
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
    console.log('WOHOO')
})
