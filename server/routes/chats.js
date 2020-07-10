const express = require("express");
const router = express.Router();
const Chat = require("../models/Chat");
const { auth } = require("../middleware/auth");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb(null, "server/uploads/");
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // fileFilter: (req, file, cb) => {
  //   const ext = path.extname(file.originalname)
  //   if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
  //     return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
  //   }
  //   cb(null, true)
  // }
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadfiles", auth, (req, res) => {
  console.log("post chat");
  upload(req, res, (err) => {
    if (err) {
      console.log("error");
      return res.json({ success: false, err });
    }

    console.log("no error");

    return res.json({
      success: true,
      url: res.req.file.path,
      type: req.file.mimetype,
    });
  });
});

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
