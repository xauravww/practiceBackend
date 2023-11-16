const express = require("express")
const users = require("./mock_users.json")
const fs = require("fs")
const port = 8000
const app = express()

//use middleware for handling body data
app.use(express.urlencoded({ extended: false }))

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
  console.log(body)
  users.push({ ...body, id: users.length + 1 })
  fs.writeFile("./mock_users.json", JSON.stringify(users), (err, data) => {
    return res.json({
      status: "success",
      id: users.length
    })
  })
})

app.listen(8000, () => {
  console.log(`Server is running in port ${port}`)
})
