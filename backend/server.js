const express = require("express");
const { initDb } = require("./db/models");
const gameRoutes = require("./routes/game");

const app = express();
app.use(express.json());

// Mount game-related routes
app.use("/game", gameRoutes);

// Start the server
const PORT = 3000;
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});
