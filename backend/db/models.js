const { Sequelize, DataTypes } = require("sequelize");
const isTest = process.env.NODE_ENV === "test";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "game.db",
  logging: isTest ? false : console.log,
});

const Room = sequelize.define("Room", {
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  phase: { type: DataTypes.STRING, defaultValue: "LOBBY" },
  round: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Player = sequelize.define("Player", {
  name: { type: DataTypes.STRING, allowNull: false },
  isVip: { type: DataTypes.BOOLEAN, defaultValue: false },
  picture: { type: DataTypes.STRING },
  loveQuote: { type: DataTypes.STRING },
});

const Boy = sequelize.define("Boy", {
  name: { type: DataTypes.STRING },
  picture: { type: DataTypes.STRING },
  votes: { type: DataTypes.INTEGER, defaultValue: 0 },
  isUsed: { type: DataTypes.INTEGER, defaultValue: 0 },
  isWinner: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const Trait = sequelize.define("Trait", {
  type: { type: DataTypes.ENUM("virtue", "vice", "tidbit", "trade"), allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  isUsed: { type: DataTypes.BOOLEAN, defaultValue: false },
});

const BoyTrait = sequelize.define("BoyTrait", {});

Room.hasMany(Player);
Player.belongsTo(Room);

Room.hasMany(Boy);
Boy.belongsTo(Room);

Player.hasMany(Boy);
Boy.belongsTo(Player);

Player.hasMany(Trait);
Trait.belongsTo(Player);

Boy.belongsToMany(Trait, { through: BoyTrait });
Trait.belongsToMany(Boy, { through: BoyTrait });

module.exports = { sequelize, Room, Player, Boy, Trait, BoyTrait };
