const { UniqueConstraintError } = require("sequelize");

const { Fact, Player } = require("../db/models");

async function submitFact(playerName, factCategory, factValue) {
  const validCategories = ["virtue", "vice", "trade", "tidbit"];
  if (!validCategories.includes(factCategory)) {
    throw new Error(`Invalid fact category: ${factCategory}`);
  }

  if (!factValue || factValue.trim() === "") {
    throw new Error("Fact value cannot be empty");
  }

  const player = await Player.findOne({ where: { name: playerName } });
  if (!player) {
    throw new Error("Player not found");
  }

  try {
    await Fact.create({
      category: factCategory,
      value: factValue,
      authorId: player.id,
    });

    return {
      message: `Fact '${factValue}' added to category '${factCategory}'`,
    };
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new Error(
        `Duplicate fact: '${factValue}' already exists for this player`
      );
    }
    throw error;
  }
}

async function getPlayerFacts(playerName) {
  const player = await Player.findOne({ where: { name: playerName } });
  if (!player) {
    throw new Error("Player not found");
  }

  const facts = await Fact.findAll({
    where: { authorId: player.id },
    attributes: ["category", "value", "BoyId"],
  });

  return facts;
}

module.exports = { submitFact, getPlayerFacts };
