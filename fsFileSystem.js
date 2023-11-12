const fs = require("fs")

//synchronous code
fs.writeFileSync("./testFileSystem.txt", "Hello this is Saurav")
const syncText = fs.readFileSync("./testFileSystem.txt", "utf-8")
console.log(syncText)

//asynchronous code
fs.writeFile(
  "./asyncTestFileSystem.txt",
  "Hello i am asynchronous text",
  () => {
    // i am a callback
  }
)

//asynchronous code
//this uses callback and not returning like sync code
fs.readFile("./asyncTestFileSystem.txt", "utf-8", (err, data) => {
  if (err) console.log(err)
  else console.log(data)
})

//appending text to files

fs.appendFile(
  "./testFileSystem.txt",
  " & Today's Date is " + new Date().getDate().toLocaleString(),
  (err) => {
    if (err) console.log("error while appending text :" + err)
  }
)

fs.mkdir("./FSTestDirectory", () => {})
fs.mkdirSync("./parentFolder/children1/children4")
fs.mkdirSync("./parentFolder/children2/grand-child", { recursive: true })

fs.cpSync("/testFileSystem.txt", "newFile.txt")
fs.unlinkSync("./newFile.txt")

console.log(fs.statSync("/testFileSystem.txt"))
