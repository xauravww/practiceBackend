import http from "http"

import { addTask, result } from "./utils.js"

import fs, { readFile } from "fs"
import { data, updateData } from "./data.js"

const readData = new Promise((resolve, reject) => {
  fs.readFile("data.txt", "utf8", (err, fileData) => {
    if (!err) {
      updateData(JSON.parse(fileData))
      console.log("Data loaded from data.txt:", data)
      resolve(data)
    } else {
      console.error("Error reading data.txt:", err)
      reject(err)
    }
  })
})

readData.then((loadedData) => {
  updateData(loadedData)
})

http
  .createServer((req, resp) => {
    resp.writeHead(200, { "Content-type": "text/html" })
    resp.write("<h1>Task Manager API</h1>")
    data.forEach((item) => {
      resp.write(JSON.stringify(item))
      resp.write("<br>")
    })
    resp.end()
  })
  .listen(5600)

let task1 = addTask("hello", "first task", "25 aug", "done")
result(task1)
const task2 = addTask("bolo", "this is my 2nd task", "1 apr", "not done")
result(task2)

console.log(data)

const task3 = addTask("golo", "this is my 3rd task", "6 may", "not done")
result(task3)

// fs.readFile("data.txt", "utf8", (err, item) => {
//   if (!err) {
//   }
// })
//for now i am using it when we have non-zero array it will work
// but we can use it after taking user-prompt like saving
//

// readData.then((loadedData) => {
//   if (loadedData.length !== 0) {
//     fs.writeFileSync("data.txt", JSON.stringify(loadedData))
//   }
// })

fs.writeFileSync("data.txt", JSON.stringify(data))
