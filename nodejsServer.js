const http = require("http")
const fs = require("fs")

const server = http.createServer((req, res) => {
  //   console.log("New Request received")
  //   console.log(req.headers)
  let log = `${Date.now()}: New Request Received on ${req.url} ` + "\n"
  switch (req.url) {
    case "/":
      fs.appendFile("log.txt", log, (err, data) => {
        res.end("Hello from server again")
      })
      break
    case "/about":
      fs.appendFile("log.txt", log, (err, data) => {
        res.end("I am Saurav")
      })
      break
    default:
      fs.appendFile("log.txt", log, (err, data) => {
        res.end("404 Not Found")
      })
  }

  //   res.end("Hello From Server")
})

server.listen(8000, () => {
  console.log("Server is running on port 8000")
})
