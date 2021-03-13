const {
  ifPercentageToFractionOf100,
  ifPercentageToFractionOfLeft,
} = require('./percentage');

const {
  doSubstraction,
  doAddition,
  doDivision,
  doMultiplication,
} = require('./operations');

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
        // eslint-disable-next-line no-param-reassign
        numberQueueParam[0] = doSubstraction(
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

    if (nextOperation && currentOperation.hierarchy > nextOperation.hierarchy) break;
    queueSize = operationQueueParam.length;
  }
};

module.exports = recursiveSolve;
