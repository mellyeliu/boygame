const { Room, Player } = require("../db/models");

async function joinRoom(roomCode, playerName) {
  let room = await Room.findOne({ where: { code: roomCode } });
  if (!room) {
    room = await Room.create({ code: roomCode });
  }

  const playerCount = await Player.count({ where: { RoomId: room.id } });
  if (playerCount >= 8) {
    throw new Error("Room is full. Maximum 8 players allowed.");
  }

  const existingPlayer = await Player.findOne({
    where: { name: playerName, RoomId: room.id },
  });
  if (existingPlayer) throw new Error("Player already exists in this room");

  const player = await Player.create({ name: playerName, RoomId: room.id });
  return { room, player };
}

async function listRooms() {
  const rooms = await Room.findAll({
    include: { model: Player, attributes: ["name", "score"] },
  });
  return rooms;
}

module.exports = { joinRoom, listRooms };
