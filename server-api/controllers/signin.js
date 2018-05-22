const handleSignIn = (db, bcrypt) => (req, res)=> {
    db
        .select('email', 'hash')
        .where('email', '=', req.body.email)
        .from('login')
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
            if (isValid) {
                return db
                    .select('*')
                    .from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get User'))
            } else {
                res.status(400).json('Incorrect Credentials!')
            }
        })
        .catch(err => res.status(400).json('Incorrect Credentials!'))
}

module.exports = {
    handleSignIn: handleSignIn,
}
