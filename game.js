const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  radius: 10,
  speed: 3,
  direction: { x: 0, y: 0 }
};

function drawPlayer() {
  ctx.fillStyle = "#4DE3FF";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
  ctx.fill();
}

function update() {
  player.x += player.direction.x * player.speed;
  player.y += player.direction.y * player.speed;

  // Keep player inside screen
  player.x = Math.max(player.radius, Math.min(canvas.width - player.radius, player.x));
  player.y = Math.max(player.radius, Math.min(canvas.height - player.radius, player.y));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") player.direction.y = -1;
  if (e.key === "ArrowDown") player.direction.y = 1;
  if (e.key === "ArrowLeft") player.direction.x = -1;
  if (e.key === "ArrowRight") player.direction.x = 1;
});

window.addEventListener("keyup", (e) => {
  if (["ArrowUp", "ArrowDown"].includes(e.key)) player.direction.y = 0;
  if (["ArrowLeft", "ArrowRight"].includes(e.key)) player.direction.x = 0;
});

gameLoop();
