function keyPressed(element) {
  console.log('key pressed');
  window.electron.onKeyPressed(element.name);
}
