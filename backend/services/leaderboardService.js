const { Player } = require("../db/models");

async function getLeaderboard() {
  const players = await Player.findAll({
    attributes: ["name", "score"],
    order: [["score", "DESC"]],
    limit: 6,
  });
  return players;
}

module.exports = { getLeaderboard };
