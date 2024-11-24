const express = require("express");
const { joinRoom } = require("../services/roomService");
const router = express.Router();

router.post("/join-room", (req, res) => {
  const { roomCode, playerName } = req.body;

  if (!roomCode || !playerName) {
    return res.status(400).send({ error: "Missing roomCode or playerName" });
  }

  try {
    const room = joinRoom(roomCode, playerName);
    res.status(200).send({ message: "Joined room", room });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
