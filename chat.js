const express = require("express");
const app = express();
const socketio = require("socket.io");

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000, () =>
  console.log("Connected to server..")
);

const io = socketio(expressServer);
io.on("connection", socket => {
  socket.emit("messageFromServer", { data: "Welcome to the server" });
  socket.on("dataFromClient", dataFromClient => {
    console.log(dataFromClient);
  });
  socket.on("newMessageToServer", msg => {
    io.emit("messageToClients", {text: msg.text});
  });
});
