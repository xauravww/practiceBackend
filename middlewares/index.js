const fs = require("fs")

function firstMiddleware(req, res, next) {
  console.log("Middleware 1 started")
  req.username = "First Middleware"
  console.log("Now starting Middleware present in stack")
  next()
}

function logReqRes(filename) {
  return (req, res, next) => {
    console.log(`Middleware 2 started by ${req.username}`)
    fs.appendFile(
      filename,
      `\n ${Date.now()}: ${req.method} ${req.path} IP: ${req.ip}`,
      (err, data) => {
        next()
      }
    )
  }
}

module.exports = { logReqRes, firstMiddleware }
