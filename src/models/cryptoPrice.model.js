const mongoose = require("mongoose");

const cryptoPriceSchema = new mongoose.Schema(
  {
    coinId: {
      type: String,
      required: true,
      enum: ["bitcoin", "matic-network", "ethereum"],
    },
    priceUSD: {
      type: Number,
      required: true,
    },
    marketCapUSD: {
      type: Number,
      required: true,
    },
    change24h: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

cryptoPriceSchema.index({ coinId: 1, createdAt: -1 });

module.exports = mongoose.model("CryptoPrice", cryptoPriceSchema);
