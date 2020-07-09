const mongoose = require("mongoose");
const { Schema } = mongoose; // equals to const Schema = mongoose.Schema

//https://mongoosejs.com/docs/guide.html#timestamps
const chatSchema = new Schema(
  {
    message: String,
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    type: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chats", chatSchema);
