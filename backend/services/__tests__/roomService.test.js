const { sequelize, Room, Player } = require("../../db/models");
const { joinRoom } = require("../roomService");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Room Service - joinRoom", () => {
  beforeEach(async () => {
    await Room.destroy({ where: {} });
    await Player.destroy({ where: {} });
  });

  test("should create a new room if it does not exist", async () => {
    const result = await joinRoom("ROOM1", "Alice");

    expect(result.room.code).toBe("ROOM1");
    expect(result.player.name).toBe("Alice");

    const rooms = await Room.findAll();
    expect(rooms.length).toBe(1);
    expect(rooms[0].code).toBe("ROOM1");

    const players = await Player.findAll();
    expect(players.length).toBe(1);
    expect(players[0].name).toBe("Alice");
  });

  test("should allow a player to join an existing room", async () => {
    const room = await Room.create({ code: "ROOM1" });
    const player1 = await Player.create({ name: "Alice", RoomId: room.id });

    const result = await joinRoom("ROOM1", "Bob");

    expect(result.room.id).toBe(room.id);
    expect(result.player.name).toBe("Bob");

    const players = await Player.findAll({ where: { RoomId: room.id } });
    expect(players.length).toBe(2);
    expect(players.map((p) => p.name)).toContain("Alice");
    expect(players.map((p) => p.name)).toContain("Bob");
  });

  test("should not allow the same player to join the same room twice", async () => {
    const room = await Room.create({ code: "ROOM1" });
    await Player.create({ name: "Alice", RoomId: room.id });

    await expect(joinRoom("ROOM1", "Alice")).rejects.toThrow(
      "Player already exists in this room"
    );

    const players = await Player.findAll({ where: { RoomId: room.id } });
    expect(players.length).toBe(1);
  });

  test("should create multiple rooms independently", async () => {
    await joinRoom("ROOM1", "Alice");
    await joinRoom("ROOM2", "Bob");

    const rooms = await Room.findAll();
    expect(rooms.length).toBe(2);
    expect(rooms.map((r) => r.code)).toContain("ROOM1");
    expect(rooms.map((r) => r.code)).toContain("ROOM2");

    const players = await Player.findAll();
    expect(players.length).toBe(2);
  });

  test("should handle case where room code is reused but with different players", async () => {
    const result1 = await joinRoom("ROOM1", "Alice");
    const result2 = await joinRoom("ROOM1", "Bob");

    expect(result1.room.id).toBe(result2.room.id);
    expect(result1.room.code).toBe("ROOM1");

    const players = await Player.findAll({
      where: { RoomId: result1.room.id },
    });
    expect(players.length).toBe(2);
    expect(players.map((p) => p.name)).toContain("Alice");
    expect(players.map((p) => p.name)).toContain("Bob");
  });
});
