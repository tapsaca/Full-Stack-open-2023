const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  username: {
    type: String,
    minLength: [3, "Username must be at least 3 characters long."],
    required: [true, "Username is required."],
    unique: true,
  },
  name: String,
  passwordHash: String,
})

userSchema.plugin(uniqueValidator, { message: "Username must be unique." })

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model("User", userSchema)
