import { dbConnect } from "./mongodb.js"

const updateData = async () => {
  let data = await dbConnect()
  let result = data.updateMany(
    {
      name: "Sama",
  
    },
    {
      $set: { name: "Naveen" }
    }
  )
  console.log(data)
}

updateData()
