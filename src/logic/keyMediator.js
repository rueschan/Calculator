const keys = require('./keys.json');

const {
  concatDigit,
  changeSign,
  buildNumber,
  addOperation,
  popNumber,
  solve,
  clear,
} = require('./calculator');

const doNumberKey = (keyDetails) => concatDigit(keyDetails.value);

const doSignKey = () => {
  changeSign();
  buildNumber();
  const result = solve();
  popNumber();
  return result;
};

const doPercentageKey = (keyDetails) => concatDigit(keyDetails.sign);

const doOpertorKey = (keyDetails) => {
  buildNumber();
  const result = solve();
  addOperation(keyDetails);
  return result;
};

const doEqualKey = () => {
  buildNumber();
  const result = solve();
  clear();
  return result;
};

const doClearKey = () => {
  clear();
  return 0;
};

const keyMediator = (keyDetails) => {
  switch (keyDetails.type) {
    case 'number':
      return doNumberKey(keyDetails);

    case 'sign':
      return doSignKey();

    case 'percentage':
      return doPercentageKey(keyDetails);

    case 'operator':
      return doOpertorKey(keyDetails);

    case 'equal':
      return doEqualKey();

    case 'clear':
      return doClearKey();

    default:
      throw Error('Unidentified key');
  }
};

module.exports = (keyId) => keyMediator(keys[keyId]);
