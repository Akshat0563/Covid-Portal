const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../model/user')

exports.signIn = async (req,res) => {

    if(req.body.email == '' || req.body.password == '') {
        res.status(400).json({message: "No field can be empty!"});
        console.log('field empty')
        return;
    }

    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
        res.send({user, token})
    }
    catch(error){
        console.log(error)
        res.status(400).send(error)
    }
}

exports.signUp = async (req, res) => {
    console.log(req.body)
    if(req.body.email == '' || req.body.password == '') {
        res.status(400).json({message: "No field can be empty!"});
        console.log('field empty')
        return;
    }

    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        tokens: []
    })

    try{
        const token = await newUser.generateToken()
        res.status(201).send({newUser, token})
    }
    catch(e){
        res.status(400).send(e)
    }
}

exports.signOut = async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((tokenObject) => tokenObject.token != req.token)
        await req.user.save()
        res.send('Signed Out')
    }
    catch(e){
        res.status(500).send(e)
    }
}

exports.signOutAll = async (req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send('Signed Out from All Sessions')
    }
    catch(e){
        res.status(500).send(e)
    }
}