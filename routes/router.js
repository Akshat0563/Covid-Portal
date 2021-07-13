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

//router.put('/api/country/:id', user.updateOneCountry)

router.get('/api/country/:countryId/state', user.getStates)

router.get('/api/state/:id', user.getOneState)

//router.put('/api/state/:id', user.updateOneState)

router.get('/api/state/:stateId/district', user.getDistricts)

router.get('/api/district/:id', user.getOneDistrict)

router.put('/api/district/:id', jsonParser, user.updateOneDistrict)

router.get('/api/hospital', user.getHospital)

router.get('/api/hospital/:id', user.getOneHospital)

router.put('/api/hospital/:id', jsonParser, user.updateOneHospital)

router.get('/api/guideline', user.getGuidelines)

router.post('/api/guideline/', jsonParser, user.postGuidelines)

router.put('/api/guideline/:id', jsonParser, user.updateGuidelines)

router.delete('/api/guideline/:id', user.deleteGuidelines)

module.exports = router
