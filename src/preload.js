const { contextBridge } = require('electron');
const keys = require('./keys.json');

let currentNumber = '';
let currentCalculationString = '';
let numberStack = [];
let operationStack = [];
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
    numberStack.push(num);
    enabledOperator = true;
  }
};

const doPercent = () => {};
const doSubstraction = (a, b) => b - a;
const doAddition = (a, b) => a + b;
const doDivision = (a, b) => a / b;
const doMultiplication = (a, b) => a * b;

const addOperation = (operatorDetails) => {
  if (enabledOperator) {
    currentCalculationString = currentCalculationString.concat(operatorDetails.sign);
    operationStack.push(operatorDetails);

    enabledOperator = false;
  }
};

const solve = () => {
  const cloneOperationStack = operationStack.slice();
  const cloneNumberStack = numberStack.slice();

  let currentOperation;

  let stackSize = cloneOperationStack.length;
  while (stackSize > 0) {
    currentOperation = cloneOperationStack.pop();

    const a = cloneNumberStack.pop();
    const b = cloneNumberStack.pop();
    switch (currentOperation.operation) {
      case 'substract':
        cloneNumberStack.push(doSubstraction(a, b));
        break;
      case 'add':
        cloneNumberStack.push(doAddition(a, b));
        break;

      default:
        throw Error('Unidentified operation');
    }

    stackSize = cloneOperationStack.length;
  }

  return cloneNumberStack.pop();
};

const clear = () => {
  currentNumber = '';
  currentCalculationString = '';
  numberStack = [];
  operationStack = [];
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
      numberStack.pop();
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

contextBridge.exposeInMainWorld(
  'electron',
  {
    onKeyPressed: (keyId) => {
      const result = keyMediator(keys[keyId]);
      console.log(currentNumber, operationStack, numberStack, currentCalculationString, result);
    },
  },
);
