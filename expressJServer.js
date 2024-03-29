const express = require("express")
const users = require("./mock_users.json")
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
const userSchema = new mongoose.Schema({
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
})

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
app.get("/users", (req, res) => {
  const html = `
 <ol>${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ol>
  `
  res.send(html)
})

//List all users
app.get("/api/v1/users", (req, res) => {
  res.json(users)
})

//get user with their id
///api/v1/users/1

app
  .route("/api/v1/users/:id")
  .get((req, res) => {
    const id = req.params.id
    const user = users.find((user) => user.id == id)
    if (!user) return res.status(404).json({ message: "User not found" })
    return res.json(user)
  })
  .patch((req, res) => {
    //TODO: Edit the user with ID
    const body = req.body
    const id = req.params.id
    const userIndex = users.findIndex((user) => user.id == id)
    const user = users.find((user) => user.id == id)

    users[userIndex].first_name = body.first_name || users[userIndex].first_name
    users[userIndex].last_name = body.last_name || users[userIndex].last_name
    users[userIndex].email = body.email || users[userIndex].email
    users[userIndex].gender = body.gender || users[userIndex].gender
    users[userIndex].job_title = body.job_title || users[userIndex].job_title

    fs.writeFile("./mock_users.json", JSON.stringify(users), (err) => {
      return res.send(err)
    })
    return res.json({
      status: "success",
      message: "User Updated Successfully",
      json: user
    })
  })
  .delete((req, res) => {
    //TODO: Delete the user with ID
    const id = req.params
    const user = users.find((user) => user.id == id)
    const rawUser = user

    users.pop(user)
    fs.writeFile("./mock_users.json", JSON.stringify(users), (err) => {
      return res.send(err)
    })
    return res.json({
      status: "success",
      message: "user deleted successfully",
      deletedUser: rawUser
    })
  })

//create a new user
app.post("/api/v1/users/", (req, res) => {
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
  console.log(body)
  users.push({ ...body, id: users.length + 1 })
  fs.writeFile("./mock_users.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({
      status: "success",
      id: users.length
    })
  })
})

app.listen(8000, () => {
  console.log(`Server is running in port ${port}`)
})
