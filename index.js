import express from "express"
import "./config.js"
import Product from "./product.js"

const app = express()
app.use(express.json())

app.get("/search/:key", async (req, resp) => {
  let data = await Product.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { brand: { $regex: req.params.key, $options: "i" } }

      // options is used for make searching case in-sensitive
    ]
  })
  resp.send(data)
})

app.listen(5000)
