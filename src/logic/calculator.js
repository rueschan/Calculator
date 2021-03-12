/* eslint-disable no-param-reassign */
const keys = require('./keys.json');

let currentNumber = '';
let currentCalculationString = '';
let numberQueue = [];
let operationQueue = [];
let enabledOperator = false;

const concatDigit = (digit) => {
  if (digit === '.' && currentNumber.includes('.')) {
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

  const num = Number.parseFloat(currentNumber);
  currentNumber = '';

  if (!Number.isNaN(num)) {
    numberQueue.push(num);
    enabledOperator = true;
  }
};

const doPercent = () => {};
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
  let currentOperation;

  let queueSize = operationQueueParam.length;
  while (queueSize > 0) {
    currentOperation = operationQueueParam.shift();

    const left = numberQueueParam.shift();
    const right = numberQueueParam[0];
    switch (currentOperation.operation) {
      case 'substraction':
        numberQueueParam[0] = doSubstraction(left, right);
        break;
      case 'addition':
        numberQueueParam[0] = doAddition(left, right);
        break;
      case 'multiplication':
        numberQueueParam[0] = doMultiplication(left, right);
        break;
      case 'division':
        numberQueueParam[0] = doDivision(left, right);
        break;

      default:
        throw Error('Unidentified operation');
    }

    queueSize = operationQueueParam.length;
  }

  return numberQueueParam.shift();
};

const solve = () => {
  const cloneOperationQueue = operationQueue.slice();
  const cloneNumberQueue = numberQueue.slice();
  return recursiveSolve(cloneOperationQueue, cloneNumberQueue);
};

const clear = () => {
  currentNumber = '';
  currentCalculationString = '';
  numberQueue = [];
  operationQueue = [];
  enabledOperator = false;
};

const keyMediator = (keyDetails) => {
  console.log('Pressed Key', keyDetails);

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

const onKeyPressed = (keyId) => {
  const result = keyMediator(keys[keyId]);
  console.log(currentNumber, operationQueue, numberQueue, currentCalculationString, result);
  return result;
};

module.exports = onKeyPressed;
