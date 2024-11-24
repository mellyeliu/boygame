const { sequelize, Player, Fact } = require("../../db/models");
const { submitFact, getPlayerFacts } = require("../factService");

beforeAll(async () => {
  await sequelize.sync({ force: true }); // Reset database before tests
});

afterAll(async () => {
  await sequelize.close(); // Close the connection after all tests
});

describe("Fact Service", () => {
  beforeEach(async () => {
    await Player.destroy({ where: {} });
    await Fact.destroy({ where: {} });
  });

  test("should allow a player to submit a unique fact", async () => {
    const player = await Player.create({ name: "Alice" });
    const response = await submitFact("Alice", "virtue", "Kind");

    expect(response).toEqual({
      message: "Fact 'Kind' added to category 'virtue'",
    });

    const facts = await Fact.findAll({ where: { authorId: player.id } });
    expect(facts.length).toBe(1);
    expect(facts[0].value).toBe("Kind");
    expect(facts[0].category).toBe("virtue");
  });

  test("should prevent a player from submitting a duplicate fact", async () => {
    const player = await Player.create({ name: "Alice" });
    await submitFact("Alice", "virtue", "Kind");

    await expect(submitFact("Alice", "virtue", "Kind")).rejects.toThrow(
      "Duplicate fact: 'Kind' already exists for this player"
    );

    const facts = await Fact.findAll({ where: { authorId: player.id } });
    expect(facts.length).toBe(1);
  });
});
