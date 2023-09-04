var startButton = document.getElementById("start");
var gameScreen = document.getElementById("game");
var timeHeader = document.getElementById("time-header");
var timeSpan = document.getElementById("time");
var resultHeader = document.getElementById("result-header");
var resultSpan = document.getElementById("result");
var gameTimeInput = document.getElementById("game-time");

var gameInProgress = false;
var gameTimer = null;
var gameStartTime = 0;
var gameEndTime = 0;
var count = 0;

startButton.addEventListener("click", startGame);

function startGame() {
  var gameTime = parseInt(gameTimeInput.value);
  gameStartTime = gameTime;
  gameEndTime = 0;
  count = 0;

  showGameScreen();
  startTimer();

  gameInProgress = true;
}

function showGameScreen() {
  startButton.classList.add("hide");
  gameScreen.innerHTML = "";
  gameScreen.style.backgroundColor = "#fff";
  resultHeader.classList.add("hide");

  createSquare();
}

function createSquare() {
  var squareSize = Math.floor(Math.random() * 50) + 50;
  var squareColor = getRandomColor();
  var maxWidth = gameScreen.offsetWidth - squareSize;
  var maxHeight = gameScreen.offsetHeight - squareSize;

  var square = document.createElement("div");
  square.style.width = squareSize + "px";
  square.style.height = squareSize + "px";
  square.style.backgroundColor = squareColor;
  square.style.position = "absolute";
  square.style.left = Math.floor(Math.random() * maxWidth) + "px";
  square.style.top = Math.floor(Math.random() * maxHeight) + "px";

  square.addEventListener("click", function() {
    if (gameInProgress) {
      gameScreen.removeChild(square);
      count++;
      createSquare();
    }
  });

  gameScreen.appendChild(square);
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function startTimer() {
  var interval = setInterval(function() {
    if (gameInProgress) {
      gameStartTime -= 0.1;
      if (gameStartTime <= 0.1) {
        clearInterval(interval);
        gameInProgress = false;
        endGame();
      }
      timeSpan.innerHTML = gameStartTime.toFixed(1);
    }
  }, 100);
}

function endGame() {
  gameScreen.innerHTML = "";
  resultSpan.innerHTML = count;
  resultHeader.classList.remove("hide");
  startButton.classList.remove("hide");
  gameScreen.style.backgroundColor = "#ccc";
}