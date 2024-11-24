const express = require("express");
const { joinRoom, listRooms } = require("../services/roomService");
const { submitFact, getPlayerFacts } = require("../services/factService");
const { getLeaderboard } = require("../services/leaderboardService");
const router = express.Router();

router.post("/start-game", async (req, res) => {
  try {
    const room = await createRoom();
    res.send({ roomCode: room.code });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

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

router.post("/submit-fact", async (req, res) => {
  const { playerName, factCategory, factValue } = req.body;

  try {
    const result = await submitFact(playerName, factCategory, factValue);
    res.send(result);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.get("/player-facts", async (req, res) => {
  const { playerName } = req.query;

  try {
    const facts = await getPlayerFacts(playerName);
    res.send(facts);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
