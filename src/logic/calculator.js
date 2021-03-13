/* eslint-disable no-param-reassign */
const keys = require('./keys.json');

const {
  isPercentage,
  ifPercentageToFractionOf100,
  ifPercentageToFractionOfLeft,
} = require('./utils/percentage');

let currentNumber = '';
let currentCalculationString = '';
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
  currentCalculationString = currentCalculationString.concat(currentNumber);

  if (isPercentage(currentCalculationString)) {
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

const doSubstraction = (a, b) => a - b;
const doAddition = (a, b) => a + b;
const doDivision = (a, b) => a / b;
const doMultiplication = (a, b) => a * b;

const addOperation = (operatorDetails) => {
  if (enabledOperator) {
    currentCalculationString = currentCalculationString.concat(operatorDetails.sign);
    operationQueue.push(operatorDetails);

    enabledOperator = false;
  }
};

const recursiveSolve = (operationQueueParam, numberQueueParam) => {
  let queueSize = operationQueueParam.length;

  while (queueSize > 0) {
    const currentOperation = operationQueueParam.shift();
    const [nextOperation] = operationQueueParam;

    const left = numberQueueParam.shift();
    if (nextOperation && currentOperation.hierarchy < nextOperation.hierarchy) {
      recursiveSolve(operationQueueParam, numberQueueParam);
    }
    const [right] = numberQueueParam;

    switch (currentOperation.operation) {
      case 'substraction':
        numberQueueParam[0] = doSubstraction(
          ifPercentageToFractionOf100(left),
          ifPercentageToFractionOfLeft(left, right),
        );
        break;
      case 'addition':
        numberQueueParam[0] = doAddition(
          ifPercentageToFractionOf100(left),
          ifPercentageToFractionOfLeft(left, right),
        );
        break;
      case 'multiplication':
        numberQueueParam[0] = doMultiplication(
          ifPercentageToFractionOf100(left),
          ifPercentageToFractionOf100(right),
        );
        break;
      case 'division':
        numberQueueParam[0] = doDivision(
          ifPercentageToFractionOf100(left),
          ifPercentageToFractionOf100(right),
        );
        break;

      default:
        throw Error('Unidentified operation');
    }

    if (nextOperation && currentOperation.hierarchy > nextOperation.hierarchy) break;
    queueSize = operationQueueParam.length;
  }
};

const solve = () => {
  const cloneOperationQueue = operationQueue.slice();
  const cloneNumberQueue = numberQueue.slice();

  recursiveSolve(cloneOperationQueue, cloneNumberQueue);
  return cloneNumberQueue.shift();
};

const clear = () => {
  currentNumber = '';
  currentCalculationString = '';
  numberQueue = [];
  operationQueue = [];
  enabledOperator = false;
};

const keyMediator = (keyDetails) => {
  let result;

  switch (keyDetails.type) {
    case 'number':
      return concatDigit(keyDetails.value);

    case 'sign':
      changeSign();
      buildNumber();
      result = solve();
      numberQueue.pop();
      return result;

    case 'percentage':
      return concatDigit(keyDetails.sign);

    case 'operator':
      buildNumber();
      result = solve();
      addOperation(keyDetails);
      return result;

    case 'equal':
      buildNumber();
      result = solve();
      clear();
      return result;

    case 'clear':
      clear();
      return 0;

    default:
      throw Error('Unidentified key');
  }
};

const onKeyPressed = (keyId) => keyMediator(keys[keyId]);

module.exports = onKeyPressed;
