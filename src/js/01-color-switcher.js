const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let colorId = null;
let bgc = null;
let isChanging = false;

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
  if (isChanging) {
    return;
  }
  colorId = setInterval(() => {
    bgc = getRandomHexColor();
    refs.body.style.backgroundColor = bgc;
    isChanging = true;
  }, 1000);
}
function onStopBtn() {
  clearInterval(colorId);
  isChanging = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
