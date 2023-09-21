import { dbConnect } from "./mongodb.js"

const getData = async () => {
  let result = await dbConnect()
  let data = await result.find().toArray()
  console.log(data)
}

// const getData = () => {
//   dbConnect().then((resp) => {
//     resp
//       .find()
//       .toArray()
//       .then((data) => {
//         console.log(data)
//       })
//   })
// }

getData()
