const express = require("express");
const { getBoyDetails } = require("../services/boyService");
const router = express.Router();

router.get("/:boyId", async (req, res) => {
  try {
    const boyId = req.params.boyId;
    const boyDetails = await getBoyDetails(boyId);
    res.send(boyDetails);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
