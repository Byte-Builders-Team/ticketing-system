const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')



const db = require('./db')
const router = require('./routes/user-router')

const app = express()
dotenv.config()


app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
db.on('error',console.error.bind(console,'MangoDB connection error:'));

app.get('/', (req, res) => {
res.send('Hello World!')
})

app.use(router)


app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));