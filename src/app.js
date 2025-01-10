const express = require("express");
const { connectDB } = require("./config/database");
const config = require("./config/config");
const logger = require("./config/logger");

const app = express();

connectDB();

app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});
