const express = require("express");
const { joinRoom, listRooms } = require("../services/roomService");
const { getLeaderboard } = require("../services/leaderboard");
const router = express.Router();

router.post("/join-room", async (req, res) => {
  const { roomCode, playerName } = req.body;
  try {
    const result = await joinRoom(roomCode, playerName);
    res.send(result);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/list-rooms", async (req, res) => {
  const rooms = await listRooms();
  res.send(rooms);
});

router.get("/leaderboard", async (req, res) => {
  const leaderboard = await getLeaderboard();
  res.send(leaderboard);
});

module.exports = router;
