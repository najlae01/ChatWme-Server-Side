const express = require("express")
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require("dotenv")
const connectDB = require('./config/db')

const { notFound, errorHandler} = require('./middleware/ErrorMiddleware')
const userRoutes = require('./routes/UserRoutes')

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
//Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors());


app.get('/', (req, res) => {
     res.send("API IS RUNNING SUCCESSFULLY")
})

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(5000, 
    console.log(`Server started on port ${PORT}..`))