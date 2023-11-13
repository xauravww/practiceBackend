const http = require("http")
const fs = require("fs")
const url = require("url")

const server = http.createServer((req, res) => {
  //   console.log("New Request received")
  //   console.log(req.headers)

  if (req.url === "/favicon.ico") return res.end()
  const log = `${Date.now()}: New Request Received on ${req.url} ` + "\n"

  const myUrl = url.parse(req.url,true)
  console.log(myUrl)

  switch (myUrl.pathname) {
    case "/":
      fs.appendFile("log.txt", log, (err, data) => {
        res.end("Hello from server again")
      })
      break
      case "/about":
          const username= myUrl.query.userName
      fs.appendFile("log.txt", log, (err, data) => {
        res.end(`hi ${username}`)
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
