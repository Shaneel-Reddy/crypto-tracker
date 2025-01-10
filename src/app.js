const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const httpStatus = require("http-status");
const cron = require("node-cron");
const config = require("./config/config");
const logger = require("./config/logger");
const routes = require("./routes");
const {
  errorConverter,
  errorHandler,
} = require("./middlewares/error.middleware");
const { connectDB } = require("./config/database");
const cryptoService = require("./services/crypto.service");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/v1", routes);

app.use(errorConverter);
app.use(errorHandler);

cron.schedule("0 */2 * * *", async () => {
  try {
    logger.info("Running scheduled price update");
    await cryptoService.updateCryptoPrices();
  } catch (error) {
    logger.error("Error during price update:", error);
  }
});

let server;
connectDB().then(() => {
  server = app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`);
    cryptoService.updateCryptoPrices();
  });
});
process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.error("Unhandled rejection:", error);
  process.exit(1);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

module.exports = app;
