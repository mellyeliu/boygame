const { sequelize, Room, Player } = require("../../db/models");
const { joinRoom, createRoom } = require("../roomService");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Room Service - createRoom", () => {
  beforeEach(async () => {
    await Room.destroy({ where: {} });
  });

  test("should create a room with a unique 4-character code", async () => {
    const room = await createRoom();

    expect(room.code).toHaveLength(4);
    const rooms = await Room.findAll();
    expect(rooms.length).toBe(1);
    expect(rooms[0].code).toBe(room.code);
  });

  test("should not create duplicate room codes", async () => {
    const room1 = await createRoom();
    const room2 = await createRoom();

    expect(room1.code).not.toBe(room2.code);

    const rooms = await Room.findAll();
    expect(rooms.length).toBe(2);
  });
});

describe("Room Service - joinRoom", () => {
  beforeEach(async () => {
    await Room.destroy({ where: {} });
    await Player.destroy({ where: {} });
  });

  test("should allow a player to join an existing room", async () => {
    const room = await createRoom(); // Create a room using the createRoom function
    const result = await joinRoom(room.code, "Alice");

    expect(result.room.code).toBe(room.code);
    expect(result.player.name).toBe("Alice");

    const players = await Player.findAll({ where: { RoomId: room.id } });
    expect(players.length).toBe(1);
    expect(players[0].name).toBe("Alice");
  });

  test("should not allow duplicate players to join the same room", async () => {
    const room = await createRoom(); // Create a room
    await joinRoom(room.code, "Alice");

    await expect(joinRoom(room.code, "Alice")).rejects.toThrow(
      "Player already exists in this room"
    );

    const players = await Player.findAll({ where: { RoomId: room.id } });
    expect(players.length).toBe(1);
    expect(players[0].name).toBe("Alice");
  });

  test("should throw an error if the room code does not exist", async () => {
    await expect(joinRoom("FAKE", "Alice")).rejects.toThrow("Room not found");

    const rooms = await Room.findAll();
    expect(rooms.length).toBe(0);
  });

  test("should allow multiple players to join the same room", async () => {
    const room = await createRoom(); // Create a room
    const player1 = await joinRoom(room.code, "Alice");
    const player2 = await joinRoom(room.code, "Bob");

    expect(player1.room.code).toBe(room.code);
    expect(player2.room.code).toBe(room.code);

    const players = await Player.findAll({ where: { RoomId: room.id } });
    expect(players.length).toBe(2);
    expect(players.map((p) => p.name)).toContain("Alice");
    expect(players.map((p) => p.name)).toContain("Bob");
  });
});
