import { dbConnect } from "./mongodb.js";


const deleteData = async () => {
    let data = await dbConnect()
    let result = await data.deleteMany({name:"Naveen"})
    console.log(result)

    if (result.acknowledged) {
        console.log("record deleted")
    }
}

deleteData()