const port = 8005

const express = require("express")
const app = express()
const { connectMongoDb } = require("./connection")
const { logReqRes, firstMiddleware } = require("./middlewares")

const userRouter = require("./routes/user")
//connect mongoose
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")

//use middleware for handling body data
app.use(express.urlencoded({ extended: false }))
app.use(firstMiddleware)
app.use(logReqRes("log.txt"))

//Routes
app.use("/api/v1/users", userRouter)

app.listen(port, () => {
  console.log(`Server is running in port ${port}`)
})
