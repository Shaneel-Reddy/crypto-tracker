const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const CryptoPrice = require("../../models/cryptoPrice.model");
const config = require("../../config/config");

describe("Crypto API endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(config.mongoose.url);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await CryptoPrice.deleteMany({});
  });

  describe("GET /v1/crypto/stats", () => {
    it("should return latest stats for bitcoin", async () => {
      await CryptoPrice.create({
        coinId: "bitcoin",
        priceUSD: 50000,
        marketCapUSD: 1000000000000,
        change24h: 2.5,
      });

      const res = await request(app)
        .get("/v1/crypto/stats")
        .query({ coin: "bitcoin" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("price", 50000);
      expect(res.body).toHaveProperty("marketCap", 1000000000000);
      expect(res.body).toHaveProperty("24hChange", 2.5);
    });

    it("should return 400 for invalid coin", async () => {
      const res = await request(app)
        .get("/v1/crypto/stats")
        .query({ coin: "invalid-coin" });

      expect(res.status).toBe(400);
    });
  });

  describe("GET /v1/crypto/deviation", () => {
    it("should calculate correct standard deviation", async () => {
      const prices = [
        {
          coinId: "bitcoin",
          priceUSD: 40000,
          marketCapUSD: 1000000,
          change24h: 1,
        },
        {
          coinId: "bitcoin",
          priceUSD: 45000,
          marketCapUSD: 1000000,
          change24h: 1,
        },
        {
          coinId: "bitcoin",
          priceUSD: 50000,
          marketCapUSD: 1000000,
          change24h: 1,
        },
      ];
      await CryptoPrice.insertMany(prices);

      const res = await request(app)
        .get("/v1/crypto/deviation")
        .query({ coin: "bitcoin" });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("deviation", 4082.48);
    });
  });
});
