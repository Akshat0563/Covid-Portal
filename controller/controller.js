const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../model/user')
const Hospital = require('../model/hospital')
const District = require('../model/district')
const State = require('../model/state')
const Country = require('../model/country')
const Guideline = require('../model/guidelines')

exports.signIn = async (req, res) => {
  if (req.body.email == '' || req.body.password == '') {
    res.status(400).json({ message: 'No field can be empty!' })
    return
  }
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateToken()
    return res.send({ user, token })
  } catch (error) {
    return res.status(400).send(error)
  }
}

exports.signUp = async (req, res) => {

  if (req.body.email == '' || req.body.password == '') {
    res.status(400).json({ message: 'No field can be empty!' })
    return
  }
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
    tokens: [],
  })
  try {
    const token = await newUser.generateToken()
    return res.status(201).send({ newUser, token })
  } catch (e) {
    return res.status(400).send(e)
  }
}

exports.signOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenObject) => tokenObject.token != req.token
    )
    await req.user.save()
    return res.send('Signed Out')
  } catch (e) {
    return res.status(500).send(e)
  }
}

exports.signOutAll = async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    return res.send('Signed Out from All Sessions')
  } catch (e) {
    return res.status(500).send(e)
  }
}

exports.updateAdmin = async (req, res) => {
  if (req.user.isAdmin) {
    const username = req.params.username
    console.log(username)
    User.findByIdAndUpdate(
      req.params.userId,
      { $set: { isAdmin: true } },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).send({
            message: `Cannot update this user to admin`,
          })
        } else {
          return res.send(data)
        }
      })
      .catch((err) => {
        return res.status(500).send({
          message: err,
        })
      })
  } else {
    return res.end('You are not authorized to perform this operation')
  }
}

exports.getCountry = async (req, res) => {
  Country.find({}).then((data) => {
    if (!data) {
      return res.status(404).send({
        message: "Cannot find countries. Check connection to database",
      })
    } else {
      return res.json(data)
    }
  })
}

exports.getOneCountry = async (req, res) => {
  const countryId = req.params.id

  Country.findById(countryId)
  .then(data => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot find country with ID ${countryId}`,
        })
      } else {
        return res.json(data)
      }
  })
}

exports.getStates = async (req, res) => {
  const countryId = req.params.countryId
  State.find({ country: countryId })
  .then((data) => {
    if (!data) {
      return res.status(404).send({
        message: "Cannot find States.",
      })
    } else {
      return res.json(data)
    }
  })
}

exports.getOneState = async (req, res) => {
  const stateId = req.params.id
  
  State.findById(stateId)
  .then((data) => {
    if (!data) {
      return res.status(404).send({
        message: `Cannot find State with ID ${stateId}`,
      })
    } else {
          return res.json(data)
    }
  })
}

exports.getDistricts = async (req, res) => {
  const stateId = req.params.stateId
  District.find({ state: stateId })
  .then((data) => {
    if (!data) {
      return res.status(404).send({
        message: "Cannot find Districts.",
      })
    } else {
      return res.json(data)
    }
  })
}

exports.getOneDistrict = async (req, res) => {
  const districtId = req.params.id
  
  District.findById(districtId)
  .then((data) => {
    if (!data) {
      return res.status(404).send({
        message: `Cannot find District with ID ${districtId}`,
      })
    } else {
          return res.json(data)
    }
  })
}

exports.updateOneDistrict = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: `Data to be updated cannot be empty` })
  }

  const id = req.params.id

  const getOldData = (document) => {
    return {
      confirmed: document.confirmed,
      deaths: document.deaths,
      active: document.active,
      recovered: document.recovered
    }
  }
  const getChanges = (oldData, body) => {
    const newData = {...oldData, ...body}
    return {
      confirmed: newData.confirmed - oldData.confirmed,
      deaths: newData.deaths - oldData.deaths,
      active: newData.active - oldData.active,
      recovered: newData.recovered - oldData.recovered
    }
  }
  const getNewData = (oldData,changes) => {
    return {
      confirmed: oldData.confirmed + changes.confirmed,
      deaths: oldData.deaths + changes.deaths,
      active: oldData.active + changes.active,
      recovered: oldData.recovered + changes.recovered
    }
  }


  try{
    const oldDistrict = await District.findById(id)
    const oldState = await State.findById(oldDistrict.state)
    const oldCountry = await Country.findById(oldState.country)
    const oldGlobal = await Country.findOne({country:"Global"})

    const changes = getChanges(getOldData(oldDistrict), req.body)

    const newDistrict = await District.findByIdAndUpdate(oldDistrict._id, getNewData(getOldData(oldDistrict), changes), { useFindAndModify: false, new:true })
    const newState = await State.findByIdAndUpdate(oldState._id, getNewData(getOldData(oldState), changes), { useFindAndModify: false, new:true })
    const newCountry = await Country.findByIdAndUpdate(oldCountry._id, getNewData(getOldData(oldCountry), changes), { useFindAndModify: false, new:true })
    const newGlobal = await Country.findByIdAndUpdate(oldGlobal._id, getNewData(getOldData(oldGlobal), changes), { useFindAndModify: false, new:true })

    res.json({district:newDistrict, state:newState, country:newCountry, global:newGlobal})
  }
  catch(e){console.log(e)}
}

exports.getHospital = async (req, res) => {
  Hospital.find({}).then((data) => {
    if (!data) {
      return res.status(404).send({
        message: "Cannot find Hospitals.",
      })
    } else {
      return res.json(data)
    }
  })
}

exports.getOneHospital = async (req, res) => {
  const hospitalId = req.params.id

  Hospital.findById(hospitalId)
  .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot find Hospital with ID ${hospitalId}`,
        })
      } else {
        return res.json(data)
      }
    })
}

exports.updateOneHospital = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: `Data to be updated cannot be empty` })
  }

  const id = req.params.id

  Hospital.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new:true})
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `cannot update hospital with ${id}. Hospital not found`,
        })
      } else {
        return res.send(data)
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Error update hospital information`,
      })
    })
}

exports.getGuidelines = async(req,res) => {
  Guideline.find({}).then((data) => {
    if (!data) {
      return res.status(404).send({
        message: `Failed to fetch the guidelines`,
      })
    } else {
      return res.send(data)
    }
  })
}

exports.postGuidelines = async (req,res) => {
  if (req.body.guideline == '') {
    return res.status(400).json({ message: 'No field can be empty!' })
  }
  const guideline = new Guideline({
    guideline: req.body.guideline
  })
  guideline
  .save(guideline)
  .then((data) => {
    return res.send(data)
  })
  .catch((err) => {
    return res.status(500).send({
      message:
        err.message ||
        `An error occured in create operation`,
    })
  })
}

exports.updateGuidelines = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: `Data to be updated cannot be empty` })
  }

  const id = req.params.id
  const newGuideline = {guideline: req.body.guideline}

  Guideline.findByIdAndUpdate(id, newGuideline, { useFindAndModify: false, new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Cannot update Guideline with ID ${id}.`,
        })
      } else {
        return res.send(data)
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: `Error update guideline information`,
      })
    })
}

exports.deleteGuidelines = (req, res) => {
  Guideline.findByIdAndRemove(req.params.id)
  .then(note => {
      if(!note) {
          return res.status(404).send({
              message: "Guideline not found with id " + req.params.id
          });
      }
      res.send({message: "Guideline deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "User not found with id " + req.params.id
          });                
      }
      return res.status(500).send({
          message: "Could not delete user with id " + req.params.id
      });
  });
};