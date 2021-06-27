const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../model/user')

exports.signIn = (req,res) => {

    if(req.body.email == '' || req.body.password == '') {
        res.status(400).json({message: "No field can be empty!"});
        console.log('field empty')
        return;
    }

    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
    .then(user => {
        if(!user) {
            res.status(404).json({emailnotfound: "Email not found"});
        }

        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(isMatch) {
                return res.status(200).json({message: `login successful`});
            } else {
                return res.status(404).json({passwordincorrect: "Password Incorrect"});
            }
        });
    });
}

exports.signUp = (req, res) => {

    if(req.body.email == '' || req.body.password == '') {
        res.status(400).json({message: "No field can be empty!"});
        console.log('field empty')
        return;
    }

    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email: "Email already exists"});
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });

            const rounds  = 10;
            bcrypt.genSalt(rounds, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }

    });
}