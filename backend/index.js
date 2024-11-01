const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = {};

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ roomCode, playerName }) => {
    if (!rooms[roomCode]) {
      rooms[roomCode] = { players: [], boardState: [] };
    }
    rooms[roomCode].players.push({ id: socket.id, name: playerName });
    socket.join(roomCode);
    io.to(roomCode).emit("updatePlayers", rooms[roomCode].players);
    io.to(roomCode).emit("updateBoard", rooms[roomCode].boardState);
  });

  socket.on("makeMove", ({ roomCode, moveData }) => {
    rooms[roomCode].boardState.push(moveData);
    io.to(roomCode).emit("updateBoard", rooms[roomCode].boardState);
  });

  socket.on("disconnect", () => {
    for (const roomCode in rooms) {
      rooms[roomCode].players = rooms[roomCode].players.filter(
        (p) => p.id !== socket.id
      );
      io.to(roomCode).emit("updatePlayers", rooms[roomCode].players);
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
