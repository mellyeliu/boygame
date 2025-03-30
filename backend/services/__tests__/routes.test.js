const request = require("supertest");
const express = require("express");
const { sequelize, Room, Player, Boy, Trait } = require("../../db/models");
const gameRoutes = require("../../routes/api");

const app = express();
app.use(express.json());
app.use("/api", gameRoutes);

let room, player1, player2;
let p1Trait1, p1Trait2, p2Trait1, p2Trait2;
let selectedTraitsForPlayer1, selectedTraitsForPlayer2;
let boy1, boy2;

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Game Flow API", () => {
  test("createGame", async () => {
    const res = await request(app).post("/api/game/create").send({});
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("code");
    room = res.body;
  });

  test("updateGame", async () => {
    const res = await request(app)
      .put(`/api/game/${room.id}/update`)
      .send({ phase: "TRAIT_SUBMISSION", round: 1 });
    expect(res.statusCode).toBe(200);
    expect(res.body.phase).toBe("TRAIT_SUBMISSION");
    expect(res.body.round).toBe(1);
  });

  test("addPlayer - player1", async () => {
    const res = await request(app)
      .post(`/api/room/${room.id}/player/add`)
      .send({ name: "Alice", picture: "alice.png", loveQuote: "i code, therefore i am", isVip: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Alice");
    player1 = res.body;
  });

  test("addPlayer - player2", async () => {
    const res = await request(app)
      .post(`/api/room/${room.id}/player/add`)
      .send({ name: "Bob", picture: "bob.png", loveQuote: "hello, world", isVip: false });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Bob");
    player2 = res.body;
  });

  test("getPlayers", async () => {
    const res = await request(app).get(`/api/room/${room.id}/players`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
  });

  test("createTraits for both players", async () => {
    const res1 = await request(app)
      .post("/api/trait/create")
      .send({ type: "virtue", text: "patience", playerId: player1.id });
    expect(res1.statusCode).toBe(200);
    p1Trait1 = res1.body;

    const res2 = await request(app)
      .post("/api/trait/create")
      .send({ type: "trade", text: "builder", playerId: player1.id });
    expect(res2.statusCode).toBe(200);
    p1Trait2 = res2.body;

    const res3 = await request(app)
      .post("/api/trait/create")
      .send({ type: "vice", text: "impatience", playerId: player2.id });
    expect(res3.statusCode).toBe(200);
    p2Trait1 = res3.body;

    const res4 = await request(app)
      .post("/api/trait/create")
      .send({ type: "tidbit", text: "quirky", playerId: player2.id });
    expect(res4.statusCode).toBe(200);
    p2Trait2 = res4.body;
  });

  test("getRandomTraits for player1 (should return traits from player2)", async () => {
    const res = await request(app).get(`/api/trait/${player1.id}/random`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(trait => {
      expect(trait.PlayerId).toBe(player2.id);
    });
    selectedTraitsForPlayer1 = res.body;
  });

  test("getRandomTraits for player2 (should return traits from player1)", async () => {
    const res = await request(app).get(`/api/trait/${player2.id}/random`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    res.body.forEach(trait => {
      expect(trait.PlayerId).toBe(player1.id);
    });
    selectedTraitsForPlayer2 = res.body;
  });

  test("createBoy for player1", async () => {
    const traitIds = selectedTraitsForPlayer1.map(t => t.id);
    const res = await request(app)
      .post("/api/boy/create")
      .send({ name: "Boy from Alice", picture: "boy1.png", traitIds, playerId: player1.id, roomId: room.id });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Boy from Alice");
    boy1 = res.body;
  });

  test("createBoy for player2", async () => {
    const traitIds = selectedTraitsForPlayer2.map(t => t.id);
    const res = await request(app)
      .post("/api/boy/create")
      .send({ name: "Boy from Bob", picture: "boy2.png", traitIds, playerId: player2.id, roomId: room.id });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Boy from Bob");
    boy2 = res.body;
  });

  test("getUnusedBoys", async () => {
    const res = await request(app).get("/api/boy/unused");
    expect(res.statusCode).toBe(200);
    const boyIds = res.body.map(b => b.id);
    expect(boyIds).toEqual(expect.arrayContaining([boy1.id, boy2.id]));
  });

  test("getNewBoy", async () => {
    const res = await request(app).get("/api/boy/new");
    expect(res.statusCode).toBe(200);
    expect([boy1.id, boy2.id]).toContain(res.body.id);
  });

  test("endRound1", async () => {
    const voteData = { boyId: boy1.id, boy2Id: boy2.id, votes: { boy: [player1.id], boy2: [player2.id] } };
    const res = await request(app).post("/api/round1/end").send(voteData);
    expect(res.statusCode).toBe(200);
    expect(res.body.boy.isWinner).toBe(1);
    expect(res.body.boy2.isWinner).toBe(1);
    expect(res.body.boy.isUsed).toBe(1);
    expect(res.body.boy2.isUsed).toBe(1);
  });

  test("endRound2", async () => {
    const voteData = { boyId: boy1.id, boy2Id: boy2.id, votes: { boy: [player1.id, player2.id], boy2: [player2.id] } };
    const res = await request(app).post("/api/round2/end").send(voteData);
    expect(res.statusCode).toBe(200);
    const winningBoy = res.body.boy.votes >= res.body.boy2.votes ? res.body.boy : res.body.boy2;
    expect(winningBoy.isWinner).toBe(2);

    const playersRes = await request(app).get(`/api/room/${room.id}/players`);
    const winningPlayer = playersRes.body.find(p => p.id == winningBoy.PlayerId);
    expect(winningPlayer).toBeDefined();
    expect(typeof winningPlayer.score).toBe("number");
    expect(winningPlayer.score).toBeGreaterThan(0);
  });

  test("getWinningTraitAuthor", async () => {
    const res = await request(app).get("/api/trait/winning-author");
    expect(res.statusCode).toBe(200);
    expect(res.body.player).toHaveProperty("id");
  });

  test("getWinningBoy", async () => {
    const res = await request(app).get("/api/boy/winning");
    expect(res.statusCode).toBe(200);
    expect(res.body.isWinner).toBe(2);
  });

  test("getLosingBoy", async () => {
    const res = await request(app).get("/api/boy/losing");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("boy");
    expect(res.body).toHaveProperty("player");
  });
});
