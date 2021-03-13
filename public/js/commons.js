function keyPressed(element) {
  const result = window.electron.onKeyPressed(element.name);

  document.getElementById('answer-text').textContent = (result || '0');

  let pixelsToReduce = 0;
  if (result && String(result).length > 10) {
    pixelsToReduce = (String(result).length - 10) * 5;
  }

  const fontSize = `${80 - pixelsToReduce}px`;
  document.getElementById('answer-text').style.fontSize = fontSize;
}
