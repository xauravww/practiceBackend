import { MongoClient } from "mongodb"

const url = "mongodb://127.0.0.1:27017/"
const database = "admin"
const client = new MongoClient(url)

export async function dbConnect() {
  let result = await client.connect()
  let db = result.db(database)
  return db.collection("videos")
}
