const { getBoyDetails } = require("../boyService");
const { Boy, Fact } = require("../../db/models");

test("should retrieve boy details with associated facts", async () => {
  // Mock the database setup
  const mockBoy = await Boy.create({
    name: "Alex",
    image: "https://placekitten.com/200/300?name=Alex",
  });
  const virtue = await Fact.create({
    category: "virtue",
    value: "Kind",
    authorId: 1,
  });
  const vice = await Fact.create({
    category: "vice",
    value: "Impulsive",
    authorId: 1,
  });
  const trade = await Fact.create({
    category: "trade",
    value: "Photographer",
    authorId: 1,
  });
  const tidbit = await Fact.create({
    category: "tidbit",
    value: "Loves cats",
    authorId: 1,
  });

  // Associate facts to the boy
  mockBoy.virtueId = virtue.id;
  mockBoy.viceId = vice.id;
  mockBoy.tradeId = trade.id;
  mockBoy.tidbitId = tidbit.id;
  await mockBoy.save();

  const boyDetails = await getBoyDetails(mockBoy.id);

  expect(boyDetails).toEqual({
    id: mockBoy.id,
    name: "Alex",
    image: "https://placekitten.com/200/300?name=Alex",
    virtue: "Kind",
    vice: "Impulsive",
    trade: "Photographer",
    tidbit: "Loves cats",
  });
});
