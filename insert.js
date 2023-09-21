import { dbConnect } from "./mongodb.js"

const insert = async () => {
  const db = await dbConnect()
    const result = await db.insertMany([
      
        { name: "Sama", RollNo: 130 },
        { name: "Rama", RollNo: 120 },
        {name:"Obama",RollNo:110}
  ])
    
    console.log(result)

    if (result.acknowledged) {
        console.log("data is inserted")
    }
}

insert()
