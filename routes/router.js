const express = require('express')
const user = require('../controller/controller')
const auth = require('../middleware/auth.js')

const jsonParser = express.json()

const router = express.Router()

router.post('/api/signIn', jsonParser, user.signIn)

router.post('/api/signUp', jsonParser, user.signUp)

router.get('/api/signOut', auth, user.signOut)

router.get('/api/signOutAll', auth, user.signOutAll)

router.put('/api/update/:userId', auth, user.updateAdmin)

router.get('/api/country', user.getCountry)

router.get('/api/country/:id', user.getOneCountry)

router.put('/api/country/:id', user.updateOneCountry)

router.get('/api/country/:countryId/states', user.getStates)

router.get('/api/country/:countryId/states/:stateId', user.getOneState)

router.put('/api/state/:id', user.updateOneState)

router.get('/api/states/:stateId/districts', user.getDistricts)

router.get(
  '/api/states/:stateId/districts/:districtId',
  user.getOneDistrict
)

router.put('/api/district/:id', user.updateOneDistrict)

router.get('/api/hospitals', user.getHospital)

router.get('/api/hospitals/:id', user.getOneHospital)

router.put('/api/hospitals/:id', user.updateOneHospital)

router.get('/api/guidelines', user.getGuidelines)

router.post('/api/guidelines/:id', jsonParser, user.postGuidelines)

router.put('/api/guidelines/:id', jsonParser, user.updateGuidelines)

router.delete('/api/guidelines/:id', jsonParser, user.deleteGuidelines)

module.exports = router
