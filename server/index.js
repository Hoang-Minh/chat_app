const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const mongoose = require("mongoose");
const usersIndex = require("./routes/users");
const chatsIndex = require("./routes/chats");
const Chat = require("./models/Chat");

mongoose.connect(config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection
  .once("open", () => console.log("database connected"))
  .on("error", () => console.log("error connected to database"));

app.use(cors());

//to not get any deprecation warning or error
//support parsing of application/x-www-form-urlencoded post data
app.use(express.urlencoded({ extended: true }));
//to get json data
// support parsing of application/json type post data
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", usersIndex);
app.use("/api/chats", chatsIndex);

io.on("connection", (socket) => {
  socket.on("Input Chat Message", async (msg) => {
    const chat = new Chat({
      message: msg.chatMessage,
      sender: msg.userId,
      type: msg.type,
    });

    console.log("Message before saving to database", chat);

    try {
      await chat.save();
      console.log(chat.id);
      const chatsFromSender = await Chat.findById(chat.id)
        .populate("sender")
        .exec();

      console.log("about to send from database to client", chatsfromSender);

      return io.emit("Output chat message", chatsFromSender); //send to client
    } catch (error) {
      console.log(error);
      return res.send({ success: false, error });
    }
  });
});

//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use("/uploads", express.static("uploads"));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));

  // index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
