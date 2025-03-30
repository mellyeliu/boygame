const express = require("express");
const cors = require("cors");
const { sequelize } = require("./db/models"); // adjust the path as needed
const gameRoutes = require("./routes/api"); // adjust the path to where your api routes are located

const app = express();

// middleware setup
app.use(cors());
app.use(express.json());

// mount the api routes under /api
app.use("/api", gameRoutes);

// choose a port, defaulting to 3000
const PORT = process.env.PORT || 3001;

// initialize the database and start the server
sequelize.sync()  // this synchronizes all defined models to the DB
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("failed to sync database:", error);
  });
