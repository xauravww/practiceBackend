import express from "express"
import { dbConnect } from "./mongodb.js"

const app = express()

app.get("/", async (req, resp) => {
  let data = await dbConnect()
  data = await data.find().toArray()
  console.log(data)

  resp.send(data)
})

app.post('/', (req, resp) => {
    resp.send({name:""})
})



app.listen(5000)
