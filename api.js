import express from "express"
import { dbConnect } from "./mongodb.js"
import mongodb from "mongodb"

const app = express()
app.use(express.json()) //we use body_parser in ear;ier expressjs
app.get("/", async (req, resp) => {
  let data = await dbConnect()
  data = await data.find().toArray()
  console.log(data)

  resp.send(data)
})

app.post("/", async (req, resp) => {
  let data = await dbConnect()
  let result = await data.insertOne(req.body)
  resp.send(result)
})

app.put("/:name", async (req, resp) => {
  let data = await dbConnect()
  let result = await data.updateOne(
    { name: req.params.name },
    { $set: req.body }
  )
  resp.send(result)
})

app.delete("/:id", async (req, resp) => {
  const data = await dbConnect()
  const result = await data.deleteOne({
    _id: new mongodb.ObjectId(req.params.id)
  })
  resp.send(result)
})

app.listen(5000)
