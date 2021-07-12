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
    res.send({ user, token })
  } catch (error) {
    res.status(400).send(error)
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
    res.status(201).send({ newUser, token })
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.signOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (tokenObject) => tokenObject.token != req.token
    )
    await req.user.save()
    res.send('Signed Out')
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.signOutAll = async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send('Signed Out from All Sessions')
  } catch (e) {
    res.status(500).send(e)
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
          res.status(404).send({
            message: `Cannot update this user to admin`,
          })
        } else {
          res.send(data)
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err,
        })
      })
  } else {
    res.end('You are not authorized to perform this operation')
  }
}

exports.getCountry = async (req, res) => {
  Country.find({}).then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Cannot find country with this name. Maybe name is wrong`,
      })
    } else {
      res.json(data)
    }
  })
}

exports.getOneCountry = async (req, res) => {
  const countryName = req.params.id

    Country.findOne({ country: countryName })
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot find country with this name. Maybe name is wrong`,
          })
        } else {
          res.json(data)
        }
    })
}

exports.updateOneCountry = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: `Data to be updated cannot be empty` })
  }

  const id = req.params.id

  Country.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot update author with ${id}. Maybe uer not found`,
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update author information`,
      })
    })
}

exports.getStates = async (req, res) => {
  const countryName = req.params.countryId
  const stateName = req.params.stateId

    
    State.find({ country: countryName }).then((data) => {
        if (!data) {
        res.status(404).send({
            message: `Cannot find State with this name. Maybe name is wrong`,
        })
        } else {
        res.json(data)
        }
    })
}

exports.getOneState = async (req, res) => {
  const countryName = req.params.countryId
  const stateName = req.params.stateId

  State.findOne({ country: countryName, state: stateName }).then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Cannot find OneState with this name. Maybe name is wrong`,
      })
    } else {
      res.json(data)
    }
  })
}

exports.updateOneState = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: `Data to be updated cannot be empty` })
  }

  const id = req.params.id

  State.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot update state with ${id}. Maybe State not found`,
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update State information`,
      })
    })
}

exports.getDistricts = async (req, res) => {
  const stateName = req.params.stateId

  District.find({ country: countryName, state: stateName }).then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Cannot find District with this name. Maybe name is wrong`,
      })
    } else {
      res.json(data)
    }
  })
}

exports.getOneDistrict = async (req, res) => {
  const stateName = req.params.stateId
  const districtName = req.params.districtId

  District.findOne({ state: stateName, district: districtName }).then(
    (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find OneDistrict with this name. Maybe name is wrong`,
        })
      } else {
        res.json(data)
      }
    }
  )
}

exports.updateOneDistrict = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: `Data to be updated cannot be empty` })
  }

  const id = req.params.id

  District.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot update district with ${id}. district not found`,
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update district information`,
      })
    })
}

exports.getHospital = async (req, res) => {
  Hospital.find({}).then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Cannot find hospital with this name. Maybe name is wrong`,
      })
    } else {
      res.json(data)
    }
  })
}

exports.getOneHospital = async (req, res) => {
  const hospitalName = req.params.id

  Hospital.findOne({ hospital: hospitalName }).then(
    (data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find onehospital with this name. Maybe name is wrong`,
        })
      } else {
        res.json(data)
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

  Hospital.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot update hospital with ${id}. Hospital not found`,
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: `Error update hospital information`,
      })
    })
}

exports.getGuidelines = async(req,res) => {
  Guideline.find({}).then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Failed to fetch the guidelines`,
      })
    } else {
      res.send(data)
    }
  })
}

exports.postGuidelines = async (req,res) => {
  if (req.body.Guideline == '') {
    res.status(400).json({ message: 'No field can be empty!' })
    console.log('field empty')
    return
  }
  console.log(req.body.Guideline)
  const guideline = new Guideline({
    Guideline: req.body.Guideline
  })
  console.log(req.body.Guideline)
    guideline
    .save(guideline)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          `some error occured while creating a create operation`,
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

  Guideline.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `cannot update guidelines with ${id}.`,
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({
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