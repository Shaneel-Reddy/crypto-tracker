const calculateStandardDeviation = (values) => {
  const n = values.length;
  const mean = values.reduce((a, b) => a + b) / n;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / n;
  return Number(Math.sqrt(variance).toFixed(2));
};

module.exports = {
  calculateStandardDeviation,
};
