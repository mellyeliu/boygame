const { Room, Player } = require("../db/models");

function generateRoomCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

async function createRoom() {
  let isUnique = false;
  let room;

  while (!isUnique) {
    const generatedCode = generateRoomCode();
    const existingRoom = await Room.findOne({ where: { code: generatedCode } });
    if (!existingRoom) {
      room = await Room.create({ code: generatedCode });
      isUnique = true;
    }
  }

  return room;
}

async function joinRoom(roomCode, playerName) {
  let room = await Room.findOne({ where: { code: roomCode } });
  if (!room) {
    throw new Error("Room not found");
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

  return rooms.map((room) => ({
    roomCode: room.code,
    playerCount: room.players.length,
    players: room.players,
  }));
}

module.exports = { createRoom, joinRoom, listRooms };
