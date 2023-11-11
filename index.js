const express = require("express")
const jwt = require("jsonwebtoken")
const secretKey = "secretKey"
const app = express()

app.get("/", (req, resp) => {
  resp.json({
    message: "A sample api"
  })
})

app.post("/login", (req, resp) => {
  const user = {
    id: 1,
    username: "saurav",
    email: "abc@test.com"
  }
  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (error, token) => {
    resp.json({
      token
    })
  })
})
app.post("/profile", verifyToken, (req, resp) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      resp.send({ result: "Invalid Token" })
    } else {
      resp.json({
        message: "Profile accessed",
        authData
      })
    }
  })
})

function verifyToken(req, resp, next) {
  const bearerHeader = req.headers["authorization"]
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ")
    const token = bearer[1]
    req.token = token
    next()
  } else {
    resp.send({
      result: "Token is not valid"
    })
  }
}

app.listen(5000, () => {
  console.log("app is running on 5000 port")
})
