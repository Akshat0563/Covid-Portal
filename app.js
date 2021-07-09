const express = require('express')
const dotenv = require('dotenv')

const app = express()

const connectDB = require('./database/connection')

dotenv.config({ path: 'config.env' })
const port = process.env.PORT

connectDB()

app.use(
  express.urlencoded({
    extended: true,
  })
)

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Headers', '*')
    res.set('Access-Control-Allow-Methods', '*')
    if (req.method === 'OPTIONS') {
        res.status(200).send()
    }
    next()
})

app.get('/', (req,res) => {
    res.send('Server running')
})

app.use('/', require('./routes/router'))

app.listen(port, () => {
  console.log(`server is running on port https://localhost:${port}`)
})
