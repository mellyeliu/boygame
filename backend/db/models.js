const { Sequelize, DataTypes } = require("sequelize");

const environment = process.env.NODE_ENV || "development";
const isTest = environment === "test";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: isTest ? ":memory:" : "game.db",
  logging: isTest ? false : console.log,
});

const Room = sequelize.define("Room", {
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Player = sequelize.define("Player", {
  name: { type: DataTypes.STRING, allowNull: false },
  score: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Fact = sequelize.define("Fact", {
  category: {
    type: DataTypes.ENUM("virtue", "vice", "trade", "tidbit"),
    allowNull: false,
  },
  value: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Boy = sequelize.define("Boy", {
  name: { type: DataTypes.STRING, allowNull: false },
});

Room.hasMany(Player);
Player.belongsTo(Room);

Player.hasMany(Fact, { as: "authoredFacts" });
Fact.belongsTo(Player, { as: "author" });

Boy.hasMany(Fact);
Fact.belongsTo(Boy);

async function initDb() {
  await sequelize.sync();
}

module.exports = { sequelize, Room, Player, Fact, Boy, initDb };
