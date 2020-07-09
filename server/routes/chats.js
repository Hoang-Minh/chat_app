const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "server/uploads/");
  },
  filename: function (req, file, cb) {
    console.log("put to uploads folder in server");
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

var fileFilter = function (req, file, cb) {
  //accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4)$/i)) {
    return cb(new Error("Only image files and mp4 are allowed!"), false);
  }
  cb(null, true);
};

var upload = multer({ storage, fileFilter }).single("file");

// ROUTES
router.get("/getChats", async (req, res) => {
  try {
    const chats = await Chat.find({}).populate("sender").exec();
    console.log("Server getChats", chats);
    res.status(200).send(chats);
  } catch (error) {
    console.log(error);
    return res.status(400).send({ error: "Chats cannot be loaded" });
  }
});

router.post("/uploadfiles", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log("error", err);
      return { success: false, err };
    }
    console.log("no error");
    return { success: true, url: res.req.file.path }; // here return to client
  });
});

module.exports = router;
