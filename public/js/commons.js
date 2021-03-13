/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

function keyPressed(element) {
  const result = window.electron.onKeyPressed(element.name);

  document.getElementById('answer-text').textContent = (result || '0');

  const MAX_RESULT_LENGTH = 5;
  let pixelsToReduce = 0;
  if (result && String(result).length > MAX_RESULT_LENGTH) {
    pixelsToReduce = Math.min(
      50,
      (String(result).length - MAX_RESULT_LENGTH) * 5,
    );
  }

  const DEFAULT_FONT_SIZE = 80;
  const fontSize = `${DEFAULT_FONT_SIZE - pixelsToReduce}px`;
  document.getElementById('answer-text').style.fontSize = fontSize;
}
