const { isPercentage } = require('./utils/percentage');
const recursiveSolve = require('./utils/recursiveSolve');

let currentNumber = '';
let numberQueue = [];
let operationQueue = [];
let enabledOperator = false;

const concatDigit = (digit) => {
  if (digit === '.' && currentNumber.includes('.')) {
    return currentNumber;
  }
  if (digit === '%' && currentNumber.includes('%')) {
    return currentNumber;
  }

  currentNumber = currentNumber.concat(digit);

  return currentNumber;
};

const changeSign = () => {
  const num = Number.parseFloat(currentNumber);
  currentNumber = String(num * -1);

  return currentNumber;
};

const buildNumber = () => {
  if (isPercentage(currentNumber)) {
    numberQueue.push(currentNumber);
    currentNumber = '';
    enabledOperator = true;
    return;
  }

  const num = Number.parseFloat(currentNumber);
  currentNumber = '';

  if (!Number.isNaN(num)) {
    numberQueue.push(num);
    enabledOperator = true;
  }
};

const addOperation = (operatorDetails) => {
  if (enabledOperator) {
    operationQueue.push(operatorDetails);
    enabledOperator = false;
  }
};

const popNumber = () => numberQueue.pop();

const solve = () => {
  const cloneOperationQueue = operationQueue.slice();
  const cloneNumberQueue = numberQueue.slice();

  recursiveSolve(cloneOperationQueue, cloneNumberQueue);
  return cloneNumberQueue.shift();
};

const clear = () => {
  currentNumber = '';
  numberQueue = [];
  operationQueue = [];
  enabledOperator = false;
};

module.exports = {
  concatDigit,
  changeSign,
  buildNumber,
  addOperation,
  popNumber,
  solve,
  clear,
};
