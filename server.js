const express = require("express")

const fs = require("fs")
const mongoose = require("mongoose")
const port = 8000
const app = express()

//connect mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/youtube-app-1")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))
//creating schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    jobTitle: {
      type: String
    },
    gender: {
      type: String
    }
  },
  { timestamps: true }
)

//create Model
const User = mongoose.model("user", userSchema)

//use middleware for handling body data
app.use(express.urlencoded({ extended: false }))

//creating own middleware
app.use((req, res, next) => {
  console.log("Middleware 1 started")
  req.username = "Saurav"
  console.log("Now starting Middleware present in stack")
  next()
})

app.use((req, res, next) => {
  console.log(`Middleware 2 started by ${req.username}`)
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()}: ${req.method} ${req.path} IP: ${req.ip}`,
    (err, data) => {
      next()
    }
  )
})

//List all users  -HTML
app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({})
  const html = `
 <ol>${allDbUsers
   .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
   .join("")}</ol>
  `
  res.send(html)
})

//List all users
app.get("/api/v1/users", async (req, res) => {
  const allDbusers = await User.find({})
  res.setHeader("X-Name", "Saurav")
  res.json(allDbusers)
})

//get user with their id
///api/v1/users/1

app
  .route("/api/v1/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    return res.json(user)
  })
  .patch(async (req, res) => {
    //TODO: Edit the user with ID
    const body = req.body
    const userUpdated = await User.findByIdAndUpdate(req.params.id, {
      email: "newemail@gmail.com"
    })

    return res.json({
      status: "success",
      message: "User Updated Successfully",
      json: userUpdated
    })
  })
  .delete(async (req, res) => {
    //TODO: Delete the user with ID
    const id = req.params
    await User.findByIdAndDelete
    return res.json({
      status: "success",
      message: "user deleted successfully",
      deletedUser: rawUser
    })
  })

//create a new user
app.post("/api/v1/users/", async (req, res) => {
  //TODO: Create the user with ID
  const body = req.body

  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "All fields are required" })
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title
  })
  console.log("result", result)
  return res.status(201).json({
    status: "success",
    message: "User created successfully",
    user: result
  })
})
app.listen(8000, () => {
  console.log(`Server is running in port ${port}`)
})
