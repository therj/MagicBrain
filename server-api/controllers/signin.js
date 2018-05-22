const handleSignIn = (db, bcrypt) => (req, res) => {
    const {
        email,
        password
    } = req.body;

    if (!email || !password) {
        return res.status(400).json("Incorrect form Submission!")
    }
    db
        .select('email', 'hash')
        .where('email', '=', email)
        .from('login')
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash)
            if (isValid) {
                return db
                    .select('*')
                    .from('users')
                    .where('email', '=', email)
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
