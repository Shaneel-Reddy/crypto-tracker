const httpStatus = require("http-status");
const CryptoPrice = require("../models/cryptoPrice.model");
const coinGeckoService = require("./coinGecko.service");
const ApiError = require("../utils/ApiError");
const logger = require("../config/logger");
const { calculateStandardDeviation } = require("../utils/statistics");
const config = require("../config/config");
class CryptoService {
  async getLatestStats(coinId) {
    const stats = await CryptoPrice.findOne(
      { coinId },
      {},
      { sort: { createdAt: -1 } }
    );

    if (!stats) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "No data found for the specified coin"
      );
    }

    return {
      price: stats.priceUSD,
      marketCap: stats.marketCapUSD,
      "24hChange": stats.change24h,
    };
  }

  async getPriceDeviation(coinId) {
    const prices = await CryptoPrice.find(
      { coinId },
      { priceUSD: 1 },
      { sort: { createdAt: -1 }, limit: 100 }
    );

    if (prices.length === 0) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "No data found for the specified coin"
      );
    }

    const priceValues = prices.map((p) => p.priceUSD);
    const deviation = calculateStandardDeviation(priceValues);

    return { deviation };
  }

  async updateCryptoPrices() {
    const supportedCoins = config.coinGecko.supportedCoins;
    const updates = [];

    for (const coinId of supportedCoins) {
      try {
        const data = await coinGeckoService.getCoinData(coinId);
        updates.push(
          CryptoPrice.create({
            coinId,
            ...data,
          })
        );
      } catch (error) {
        logger.error(`Failed to update ${coinId} prices:`, error);
      }
    }

    await Promise.allSettled(updates);
  }
}

module.exports = new CryptoService();
