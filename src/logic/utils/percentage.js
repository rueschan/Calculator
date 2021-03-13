const isPercentage = (candidate) => typeof candidate === 'string' && candidate.includes('%');

const ifPercentageToFractionOf100 = (num) => {
  if (isPercentage(num)) {
    const rawNum = num.replace('%', '');
    return Number.parseFloat(rawNum) / 100;
  }
  return Number.parseFloat(num);
};

const ifPercentageToFractionOfLeft = (left, num) => {
  if (isPercentage(num)) {
    const rawNum = num.replace('%', '');
    return Number.parseFloat(rawNum) * (left / 100);
  }
  return Number.parseFloat(num);
};

module.exports = {
  isPercentage,
  ifPercentageToFractionOf100,
  ifPercentageToFractionOfLeft,
};
