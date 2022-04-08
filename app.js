require('dotenv').config()
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()

const pollRouter = require('./routes/pollRoutes')


//DB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB Connected")
}).catch((err)=>{
    console.log(err.message)
})

//MiddleWares
app.use(express.json())

app.use("/polls", pollRouter);


app.listen(process.env.PORT,()=>{
    console.log("Server is running on port 8080")
})
