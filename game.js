const player = document.getElementById('player');
const ai = document.getElementById('ai');
const scoreDisplay = document.getElementById('score');
const road = document.getElementById('road');

const lanes = [50, 150, 250, 350];
let playerLane = 1;
let playerY = 500;
let aiY = -100;
let score = 0;
let gameOver = false;

function updatePlayerPosition() {
  player.style.left = `${lanes[playerLane]}px`;
  player.style.top = `${playerY}px`;
}

function updateAIPosition() {
  aiY += 2;
  if (aiY > 600) {
    aiY = -100;
    score++;
  }
  ai.style.top = `${aiY}px`;
}

function checkCollision() {
  if (playerY < aiY + 80 && playerY + 80 > aiY) {
    if (lanes[playerLane] < 40 || lanes[playerLane] > 350) {
      gameOver = true;
      alert('Game Over!');
    }
  }
}

function gameLoop() {
  if (gameOver) return;

  updateAIPosition();
  checkCollision();
  scoreDisplay.textContent = `Score: ${score}`;
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && playerLane > 0) playerLane--;
  if (e.key === 'ArrowRight' && playerLane < lanes.length - 1) playerLane++;
  if (e.key === 'ArrowUp' && playerY > 0) playerY -= 10;
  if (e.key === 'ArrowDown' && playerY < 520) playerY += 10;
  updatePlayerPosition();
});

updatePlayerPosition();
gameLoop();
