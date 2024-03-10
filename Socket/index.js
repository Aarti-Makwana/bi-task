const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');
const app = express();
const server = http.createServer(app);
app.use(cors());

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

let activeChatUsers = [];
const chatNamespace = io.of('/chat');
chatNamespace.on("connection", (socket) => {
  console.log("user connected");
  socket.on('new-user-add', (newUserId) => {
    if (!newUserId || newUserId != undefined) {
      if (!activeChatUsers.some((user) => user.userId === newUserId)) {
        activeChatUsers.push({
          userId: newUserId,
          socketId: socket.id
        })
      }
    }
    chatNamespace.emit('get-users', activeChatUsers);
  });

  socket.on("disconnect", () => {
    activeChatUsers = activeChatUsers.filter((user) => user.socketId !== socket.id);
    chatNamespace.emit('get-users', activeChatUsers);
  });

  socket.on("send-message", (data) => {
    const { reciverId } = data;
    const user = activeChatUsers.find((user) => user.userId == reciverId);
    if (user) {
      chatNamespace.to(user.socketId).emit("recive-message", data);
    }
  });
});

server.listen(8800, () => {
  console.log('Server is running on port 8800');
});
