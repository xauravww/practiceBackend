const User = require("../models/user")

// async function handlegetAllUsersHTML(req, res) {
//   const allDbUsers = await User.find({})
//   const html = `
//      <ol>${allDbUsers
//        .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
//        .join("")}</ol>
//       `
//   res.send(html)
// }

async function handlegetAllUsers(req, res) {
  console.log("handler is wokring")
  const allDbusers = await User.find({})
  res.setHeader("X-Name", "Saurav")
  res.json(allDbusers)
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id)
  if (!user) return res.status(404).json({ message: "User not found" })
  return res.json(user)
}

async function handleUpdateUserById(req, res) {
  const body = req.body
  const userUpdated = await User.findByIdAndUpdate(req.params.id, {
    email: "newemail@gmail.com"
  })

  return res.json({
    status: "success",
    message: "User Updated Successfully",
    json: userUpdated
  })
}
async function handleDeleteUserById(req, res) {
  const id = req.params.id
  await User.findByIdAndDelete(id)
  return res.json({
    status: "success",
    message: "user deleted successfully"
  })
}

async function handleCreateNewUser(req, res) {
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
    user: result._id
  })
}

module.exports = {
  // handlegetAllUsersHTML,
  handlegetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser
}
