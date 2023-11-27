const express = require("express")
const router = express.Router()

console.log("router is working ")
const {
  // handlegetAllUsersHTML,
  handlegetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser
} = require("../controllers/user")

//List all users  -HTML
// router.get("/html", handlegetAllUsersHTML)

//List all users & create new user
router.route("/").get(handlegetAllUsers).post(handleCreateNewUser)

//get user with their id
///api/v1/users/1

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById)

module.exports = router
