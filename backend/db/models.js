const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "game.db",
});

const Room = sequelize.define("Room", {
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Player = sequelize.define("Player", {
  name: { type: DataTypes.STRING, allowNull: false },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
  facts: { type: DataTypes.JSON, allowNull: true },
});

Room.hasMany(Player);
Player.belongsTo(Room);

async function initDb() {
  await sequelize.sync();
  console.log("Database synced");
}

module.exports = { sequelize, Room, Player, initDb };
