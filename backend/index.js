const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const controller = require('./Controllers/userController')

const port = 4000

const url = "mongodb://127.0.0.1:27017/matrimony"

mongoose.connect(url).then(() => console.log('Database Connected Successfully!!')).catch((err) => caonsole.log(`Error in connecting to Database:\n${err}`))


const app = express()

app.use(express.json())
app.use(cors())

app.post('/api/user', controller.registerUser);

app.get('/api/user', );

app.listen(port, () => {
    console.log(`Server started at port ${port}`)
})