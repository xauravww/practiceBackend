import { dbConnect } from "./mongodb.js"

const insert = async () => {
  const db = await dbConnect()
    const result = await db.insertMany([
      
        { name: "Hans", RollNo: 130 },
        { name: "Saurav", RollNo: 120 },
        {name:"pankaj"}
  ])
    
    console.log(result)

    if (result.acknowledged) {
        console.log("data is inserted")
    }
}

insert()
