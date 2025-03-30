const express = require("express");
const { Op, fn, col, literal } = require("sequelize");
const router = express.Router();
const { Room, Player, Boy, Trait, BoyTrait, sequelize } = require("../db/models");

// helper function to generate a random 4-character room code
function generateRoomCode() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// createGame(): creates a room and returns the room code
router.post("/game/create", async (req, res) => {
  try {
    const { code } = req.body;
    const roomCode = code || generateRoomCode();
    const room = await Room.create({ code: roomCode, phase: "LOBBY", round: 0 });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// updateGame(): update game phase and/or round
router.put("/game/:id/update", async (req, res) => {
  try {
    const { phase, round } = req.body;
    const room = await Room.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "room not found" });
    if (phase) room.phase = phase;
    if (typeof round !== "undefined") room.round = round;
    await room.save();
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// addPlayer(game, player): adds player to game
router.post("/room/:roomCode/player/add", async (req, res) => {
  try {
    const { name, picture, loveQuote, isVip } = req.body;
    const code = req.params.roomCode.toUpperCase(); // normalize casing
    const room = await Room.findOne({ where: { code } });

    if (!room) return res.status(404).json({ error: "Room not found" });

    const player = await Player.create({
      name,
      picture,
      loveQuote,
      isVip: isVip || false,
      RoomId: room.id, // still needed — this is the FK
      score: 0,
    });

    res.json(player);
  } catch (err) {
    console.error("Failed to add player:", err);
    res.status(500).json({ error: err.message });
  }
});

// getPlayers(game): returns all players in the game
router.get("/room/:roomCode/players", async (req, res) => {
  try {
    const code = req.params.roomCode.toUpperCase();
    const room = await Room.findOne({ where: { code } });

    if (!room) return res.status(404).json({ error: "Room not found" });

    const players = await Player.findAll({
      where: { RoomId: room.id }, // ✅ this is what links them
      order: [["createdAt", "ASC"]],
    });

    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/debug/rooms", async (req, res) => {
  const rooms = await Room.findAll();
  res.json(rooms);
});


// createTrait(): adds a trait
router.post("/trait/create", async (req, res) => {
  try {
    const { type, text, playerId } = req.body;
    const trait = await Trait.create({ type, text, PlayerId: playerId, isUsed: false });
    res.json(trait);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// getTraits(player): selects a calculated number of random, unused traits not belonging to the player
router.get("/trait/:playerId/random", async (req, res) => {
  try {
    const player = await Player.findByPk(req.params.playerId);
    if (!player) return res.status(404).json({ error: "player not found" });
    // get all players in the same room to calculate the ratio
    const players = await Player.findAll({ where: { RoomId: player.RoomId } });
    const playerCount = players.length;

    // find all unused traits not submitted by the player
    const availableTraits = await Trait.findAll({
      where: { isUsed: false, PlayerId: { [Op.ne]: player.id } },
    });

    // determine the number of traits to select; at least 1 trait
    const numberToPick = Math.max(Math.floor(availableTraits.length / playerCount), 1);

    // randomly select the traits
    const shuffled = availableTraits.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, numberToPick);

    // mark selected traits as used
    for (let trait of selected) {
      trait.isUsed = true;
      await trait.save();
    }
    res.json(selected);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// createBoy([traits]): creates a boy, associates selected traits, and marks traits as used
router.post("/boy/create", async (req, res) => {
  try {
    const { name, picture, traitIds, playerId, roomId } = req.body;
    // validate traits existence and status
    const traits = await Trait.findAll({ where: { id: traitIds, isUsed: true } });
    if (traits.length !== traitIds.length) {
      return res.status(400).json({ error: "one or more traits are invalid or not selected properly" });
    }
    const boy = await Boy.create({ name, picture, PlayerId: playerId, RoomId: roomId, votes: 0, isUsed: 0, isWinner: 0 });
    await boy.addTraits(traits);
    res.json(boy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// getBoys(): returns unused boys (isUsed === 0)
router.get("/boy/unused", async (req, res) => {
  try {
    const boys = await Boy.findAll({ where: { isUsed: 0 } });
    res.json(boys);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// getNewBoy(): returns an unused boy candidate for head-to-head voting
router.get("/boy/new", async (req, res) => {
  try {
    const boy = await Boy.findOne({ where: { isUsed: 0 } });
    if (!boy) return res.status(404).json({ error: "no new boy available" });
    res.json(boy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// endRound1(votes): updates boys with votes and sets winner status (if tie, both win)
// expects: { boyId, boy2Id, votes: { boy: [playerIds], boy2: [playerIds] } }
router.post("/round1/end", async (req, res) => {
  try {
    const { boyId, boy2Id, votes } = req.body;
    if (!boyId || !boy2Id || !votes) return res.status(400).json({ error: "invalid input" });
    const boy = await Boy.findByPk(boyId);
    const boy2 = await Boy.findByPk(boy2Id);
    if (!boy || !boy2) return res.status(404).json({ error: "one or both boys not found" });

    boy.votes = votes.boy ? votes.boy.length : 0;
    boy2.votes = votes.boy2 ? votes.boy2.length : 0;

    if (boy.votes === boy2.votes) {
      boy.isWinner = 1;
      boy2.isWinner = 1;
    } else if (boy.votes > boy2.votes) {
      boy.isWinner = 1;
      boy2.isWinner = 0;
    } else {
      boy.isWinner = 0;
      boy2.isWinner = 1;
    }
    // mark as used in round1
    boy.isUsed = 1;
    boy2.isUsed = 1;

    await boy.save();
    await boy2.save();

    res.json({ boy, boy2 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// endRound2(votes): updates boys with votes and updates player points based on winning boy
// expects: { boyId, boy2Id, votes: { boy: [playerIds], boy2: [playerIds] } }
router.post("/round2/end", async (req, res) => {
  try {
    const { boyId, boy2Id, votes } = req.body;
    if (!boyId || !boy2Id || !votes) return res.status(400).json({ error: "invalid input" });
    const boy = await Boy.findByPk(boyId);
    const boy2 = await Boy.findByPk(boy2Id);
    if (!boy || !boy2) return res.status(404).json({ error: "one or both boys not found" });

    boy.votes = votes.boy ? votes.boy.length : 0;
    boy2.votes = votes.boy2 ? votes.boy2.length : 0;

    if (boy.votes === boy2.votes) {
      boy.isWinner = 2;
      boy2.isWinner = 2;
    } else if (boy.votes > boy2.votes) {
      boy.isWinner = 2;
      boy2.isWinner = 0;
    } else {
      boy.isWinner = 0;
      boy2.isWinner = 2;
    }

    await boy.save();
    await boy2.save();

    // update player points for the creator of the winning boy
    const winningBoy = boy.votes >= boy2.votes ? boy : boy2;
    const player = await Player.findByPk(winningBoy.PlayerId);
    if (player) {
      player.score += 1; // adjust scoring logic as needed
      await player.save();
    }

    res.json({ boy, boy2 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// getWinningTraitAuthor(): returns the player whose traits have been used the most
router.get("/trait/winning-author", async (req, res) => {
  try {
    const results = await Trait.findAll({
      where: { isUsed: true },
      attributes: ["PlayerId", [fn("COUNT", col("id")), "usedCount"]],
      group: ["PlayerId"],
      order: [[literal("usedCount"), "DESC"]],
    });
    if (results.length === 0)
      return res.status(404).json({ error: "no traits used" });
    const winningPlayerId = results[0].PlayerId;
    const player = await Player.findByPk(winningPlayerId);
    res.json({ player, usedCount: results[0].get("usedCount") });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// getWinningBoy(): returns the boy with isWinner value of 2 (the final winner)
router.get("/boy/winning", async (req, res) => {
  try {
    const boy = await Boy.findOne({ where: { isWinner: 2 } });
    if (!boy) return res.status(404).json({ error: "no winning boy found" });
    res.json(boy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// getLosingBoy(): returns the boy with the lowest votes and its creator (as a proxy for worst taste)
router.get("/boy/losing", async (req, res) => {
  try {
    const boy = await Boy.findOne({ order: [["votes", "ASC"]] });
    if (!boy) return res.status(404).json({ error: "no boy found" });
    const player = await Player.findByPk(boy.PlayerId);
    res.json({ boy, player });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
