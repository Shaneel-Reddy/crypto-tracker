const axios = require("axios");
const coinGeckoService = require("../../../services/coinGecko.service");
const ApiError = require("../../../utils/ApiError");
const httpStatus = require("http-status");

jest.mock("axios");

describe("CoinGeckoService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getCoinData", () => {
    it("should fetch and format coin data correctly", async () => {
      const mockResponse = {
        data: {
          bitcoin: {
            usd: 50000,
            usd_market_cap: 1000000000000,
            usd_24h_change: 2.5,
          },
        },
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await coinGeckoService.getCoinData("bitcoin");

      expect(result).toEqual({
        priceUSD: 50000,
        marketCapUSD: 1000000000000,
        change24h: 2.5,
      });
    });

    it("should throw ApiError when coin is not found", async () => {
      const mockResponse = {
        data: {},
      };

      axios.get.mockResolvedValue(mockResponse);

      await expect(
        coinGeckoService.getCoinData("invalid-coin")
      ).rejects.toThrow(ApiError);
    });

    it("should handle API errors properly", async () => {
      axios.get.mockRejectedValue(new Error("API Error"));

      await expect(coinGeckoService.getCoinData("bitcoin")).rejects.toThrow(
        ApiError
      );
    });
  });
});
