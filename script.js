/*html elements*/
/*screen 1*/
let btnStart = document.querySelector('#start-btn');
let screens = document.querySelectorAll('.screen');

/*screen 2*/
let timeList = document.querySelector('#time-list');

/*screen 3*/
let timeEl = document.querySelector('#time');
let board = document.querySelector('#board');

/*variables*/
let time = 0; //0 поставить
let count = 0;
let timer;
let colorsArr = ['#fbf8cc', '#fde4cf' , '#ffcfd2', '#f1c0e8', '#cfbaf0', '#a3c4f3', '#90dbf4', '#8eecf5', '#98f5e1', '#b9fbc0'];


btnStart.addEventListener('click', () => {
   screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
   if (event.target.classList.contains('time-btn')) {
      time = +event.target.dataset.time;
      screens[1].classList.add('up');
      startGame();
   }
});

board.addEventListener('click', (event) => {
   if (event.target.classList.contains('circle')) {
      count++;
      event.target.remove();
      createRandomCircle();
   }
});

function startGame() {
   timer = setInterval(decreaseTime, 1000);
   createRandomCircle();
   timeEl.innerHTML = `00:${time}`;
}

function decreaseTime() {
   if (time > 0) {
      let currentTime = --time;
      if (currentTime < 10) currentTime = `0${currentTime}`;
      timeEl.innerHTML = `00:${currentTime}`;
   } else {
      finishGame();
   }
}

function finishGame() {
   clearInterval(timer);
   timeEl.parentElement.classList.add('hide');
   board.innerHTML = `
      <div class="finish">
         <h1>Score: <span class="primary">${count}</span></h1>
         <button class="repeat-btn" id="repeat-btn">Try again</button>
      </div>
   `;
   repeatGame();
}

function createRandomCircle() {
   let circle = document.createElement('div');
   circle.className = 'circle';

   let size = getRandomNum(10, 50);
   let widthOfBoard = board.getBoundingClientRect().width;
   let heightOfBoard = board.getBoundingClientRect().height;
   let x = getRandomNum(0, widthOfBoard - size);
   let y = getRandomNum(0, heightOfBoard - size);

   let color = getRandomColor();

   circle.style.width = size + 'px';
   circle.style.height = size + 'px';

   circle.style.left = x + 'px';
   circle.style.top = y + 'px';

   circle.style.backgroundColor = color;
   circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

   board.append(circle);
}

function getRandomNum(min, max) {
   return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
   return colorsArr[Math.floor(Math.random() * colorsArr.length)];
}

function repeatGame() {
   let btnRepeat = document.querySelector('#repeat-btn');
   btnRepeat.addEventListener('click', () => {

      setTimeout(() => {
         location.reload();
      }, 1000);
   });

}