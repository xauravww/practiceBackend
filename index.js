import mongoose from "mongoose"
mongoose.connect("mongodb://localhost:27017/e-comm")
const ProductsSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  category: String
})
const saveInDB = async () => {
  const ProductsModel = mongoose.model("products", ProductsSchema)

  let data = new ProductsModel({
    name: "poco m2",
    price: 1000,
    brand: "xiaomi",
    category: "mobile"
  })
  let result = await data.save()

  console.log(result)
}

const updateInDB = async () => {
  const Products = mongoose.model("products", ProductsSchema)
  let data = await Products.updateOne(
    { name: "poco m2" },
    {
      $set: {
        price: 14000
      }
    }
  )

  console.log(data)
}

const deleteInDB = async () => {
  const Products = mongoose.model("products", ProductsSchema)
  let data = await Products.deleteMany({
    name: "poco m2"
  })

  console.log(data)
}

const findInDB = async () => {
  const Products = mongoose.model("products", ProductsSchema)
  let data = await Products.find()

  console.log(data)
}

// saveInDB()
// updateInDB()
// deleteInDB()
findInDB()
