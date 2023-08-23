import http from "http"
import data from "./data.mjs"

http
  .createServer((req, res) => {
    res.writeHead(206, { "Content-type": "application/json" })
    res.write(JSON.stringify(data))
    res.end()
  })
  .listen(5500)
