require("dotenv").config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URI,
    testUrl: process.env.MONGODB_URI_TEST,
    options: {},
  },
  coinGecko: {
    baseUrl: "https://api.coingecko.com/api/v3",
    supportedCoins: ["bitcoin", "matic-network", "ethereum"],
  },
};
