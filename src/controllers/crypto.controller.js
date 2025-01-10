const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const cryptoService = require("../services/crypto.service");

const getStats = catchAsync(async (req, res) => {
  const { coin } = req.query;
  const stats = await cryptoService.getLatestStats(coin);
  res.status(httpStatus.OK).json(stats);
});

const getDeviation = catchAsync(async (req, res) => {
  const { coin } = req.query;
  const deviation = await cryptoService.getPriceDeviation(coin);
  res.status(httpStatus.OK).json(deviation);
});

module.exports = {
  getStats,
  getDeviation,
};
