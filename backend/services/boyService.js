const { Boy, Fact } = require("../db/models");

async function getBoyDetails(boyId) {
  try {
    // Fetch the boy and associated facts
    const boy = await Boy.findOne({
      where: { id: boyId },
      include: [
        { model: Fact, as: "virtue" },
        { model: Fact, as: "vice" },
        { model: Fact, as: "trade" },
        { model: Fact, as: "tidbit" },
      ],
    });

    if (!boy) {
      throw new Error("Boy not found");
    }

    // Format the result
    return {
      id: boy.id,
      name: boy.name,
      image: boy.image,
      virtue: boy.virtue?.value || null,
      vice: boy.vice?.value || null,
      trade: boy.trade?.value || null,
      tidbit: boy.tidbit?.value || null,
    };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve boy details");
  }
}

module.exports = { getBoyDetails };
