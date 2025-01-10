const axios = require("axios");
const config = require("../config/config");
const logger = require("../config/logger");
const ApiError = require("../utils/ApiError");

class CoinGeckoService {
  constructor() {
    this.baseUrl = config.coinGecko.baseUrl;
  }

  async getCoinData(coinId) {
    try {
      const response = await axios.get(`${this.baseUrl}/simple/price`, {
        params: {
          ids: coinId,
          vs_currencies: "usd",
          include_market_cap: true,
          include_24hr_change: true,
        },
      });

      if (!response.data[coinId]) {
        throw new ApiError(httpStatus.NOT_FOUND, "Coin not found");
      }

      const data = response.data[coinId];
      return {
        priceUSD: data.usd,
        marketCapUSD: data.usd_market_cap,
        change24h: data.usd_24h_change,
      };
    } catch (error) {
      logger.error("CoinGecko API Error:", error);
      throw new ApiError(
        error.response?.status || httpStatus.INTERNAL_SERVER_ERROR,
        error.response?.data?.error || "Failed to fetch coin data"
      );
    }
  }
}

module.exports = new CoinGeckoService();
