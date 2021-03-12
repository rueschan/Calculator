/* eslint-disable no-mixed-operators */
const onKeyPressed = require('../../../src/logic/calculator');

const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

describe('Separated operations by hierarchy', () => {
  test('Substraction and addition only', () => {
    for (let i = 0; i < 10; i += 1) {
      const a = Math.floor(Math.random() * 9);
      const b = Math.floor(Math.random() * 9);
      const c = Math.floor(Math.random() * 9);
      const d = Math.floor(Math.random() * 9);
      const e = Math.floor(Math.random() * 9);

      const correctAnswer = a + b - c + d - e;

      onKeyPressed(numbers[a]);
      onKeyPressed('addition');
      onKeyPressed(numbers[b]);
      onKeyPressed('substraction');
      onKeyPressed(numbers[c]);
      onKeyPressed('addition');
      onKeyPressed(numbers[d]);
      onKeyPressed('substraction');
      onKeyPressed(numbers[e]);

      const answer = onKeyPressed('equal');
      expect(answer).toBe(correctAnswer);
    }
  });

  test('Multiplication and division only', () => {
    for (let i = 0; i < 10; i += 1) {
      const a = Math.floor(Math.random() * 9);
      const b = Math.floor(Math.random() * 9);
      const c = Math.floor(Math.random() * 9);
      const d = Math.floor(Math.random() * 9);
      const e = Math.floor(Math.random() * 9);

      const correctAnswer = a * b / c * d / e;

      onKeyPressed(numbers[a]);
      onKeyPressed('multiplication');
      onKeyPressed(numbers[b]);
      onKeyPressed('division');
      onKeyPressed(numbers[c]);
      onKeyPressed('multiplication');
      onKeyPressed(numbers[d]);
      onKeyPressed('division');
      onKeyPressed(numbers[e]);

      const answer = onKeyPressed('equal');
      expect(answer).toBe(correctAnswer);
    }
  });
});

describe('Mixed operations by hierarchy', () => {
  test('Hierarchy 1 and 2 operations', () => {
    for (let i = 0; i < 10; i += 1) {
      const a = Math.floor(Math.random() * 9);
      const b = Math.floor(Math.random() * 9);
      const c = Math.floor(Math.random() * 9);
      const d = Math.floor(Math.random() * 9);
      const e = Math.floor(Math.random() * 8) + 1; // Will be divider. Can't be zero

      const correctAnswer = a + b * c - d / e;

      onKeyPressed(numbers[a]);
      onKeyPressed('addition');
      onKeyPressed(numbers[b]);
      onKeyPressed('multiplication');
      onKeyPressed(numbers[c]);
      onKeyPressed('substraction');
      onKeyPressed(numbers[d]);
      onKeyPressed('division');
      onKeyPressed(numbers[e]);

      const answer = onKeyPressed('equal');
      expect(answer).toBe(correctAnswer);
    }
  });
});
