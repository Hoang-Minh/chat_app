const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const { auth } = require("../middleware/auth");

router.get("/getChats", async (req, res) => {
  try {
    console.log("Server getChats");
    const chats = await Chat.find().populate("sender").exec();
    res.status(200).send(chats);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Chats cannot be loaded" });
  }
});

module.exports = router;
