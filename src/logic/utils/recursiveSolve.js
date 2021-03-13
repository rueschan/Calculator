const {
  ifPercentageToFractionOf100,
  ifPercentageToFractionOfLeft,
} = require('./percentage');

const {
  doSubtraction,
  doAddition,
  doDivision,
  doMultiplication,
} = require('./operations');

const recursiveSolve = (operationQueueParam, numberQueueParam, depth = 0) => {
  let queueSize = operationQueueParam.length;

  while (queueSize > 0) {
    const currentOperation = operationQueueParam.shift();
    const [nextOperation] = operationQueueParam;

    const left = numberQueueParam.shift();
    if (nextOperation && currentOperation.hierarchy < nextOperation.hierarchy) {
      recursiveSolve(operationQueueParam, numberQueueParam, depth + 1);
    }
    const [right] = numberQueueParam;

    switch (currentOperation.operation) {
      case 'subtraction':
        // eslint-disable-next-line no-param-reassign
        numberQueueParam[0] = doSubtraction(
          ifPercentageToFractionOf100(left),
          ifPercentageToFractionOfLeft(left, right),
        );
        break;
      case 'addition':
        // eslint-disable-next-line no-param-reassign
        numberQueueParam[0] = doAddition(
          ifPercentageToFractionOf100(left),
          ifPercentageToFractionOfLeft(left, right),
        );
        break;
      case 'multiplication':
        // eslint-disable-next-line no-param-reassign
        numberQueueParam[0] = doMultiplication(
          ifPercentageToFractionOf100(left),
          ifPercentageToFractionOf100(right),
        );
        break;
      case 'division':
        // eslint-disable-next-line no-param-reassign
        numberQueueParam[0] = doDivision(
          ifPercentageToFractionOf100(left),
          ifPercentageToFractionOf100(right),
        );
        break;

      default:
        throw Error('Unidentified operation');
    }

    if (nextOperation && currentOperation.hierarchy > nextOperation.hierarchy && depth > 0) break;
    queueSize = operationQueueParam.length;
  }
};

module.exports = recursiveSolve;
