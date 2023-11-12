const jwt = require("jsonwebtoken")
const express = require("express")

const app = express()

app.get("/", (req, res) => {
  //   res.json({
  //     result: "Success"
  //   })
  res.send({
    result: "Success"
  })
})

app.post("/login", (req, res) => {
  const user = {
    name: "Saurav",
    skills: ["nodejs", "html", "css", "js", "reactjs"]
  }

  const token = jwt.sign(user, "secretkey", { expiresIn: "500s" })
  res.json({
    token: token
  })
})

app.get("/profile", verifyProfile, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.json({
        result: "Failed to verify token"
      })
    } else {
      res.send({
        data: authData
      })
    }
  })
})

function verifyProfile(req, res, next) {
  const bearerHeader = req.headers["authorization"]
  if (typeof bearerHeader !== "undefined") {
    const headerArr = bearerHeader.split(" ")
    const token = headerArr[1]
    req.token = token
    next()
  } else {
    req.send({
      result: "Token is invalid"
    })
  }
}

app.listen(5000, () => {
  console.log("Server Started Successfully on port 5000")
})
