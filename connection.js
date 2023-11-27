const mongoose = require("mongoose")

function connectMongoDb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err))
}

module.exports = { connectMongoDb }
