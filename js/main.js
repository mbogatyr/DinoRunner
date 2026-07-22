const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gameOverScreen = document.getElementById('game-over');

canvas.width = 800;
canvas.height = 200;

const dino = new Dinosaur(canvas);
// scoreManager, input, и sounds теперь уже инициализированы в своих файлах

let cacti = [];
let clouds = [];
let gameState = 'START';
let gameActive = false;
let spawnTimer = 0;
let cloudSpawnTimer = 0;
let gameSpeed = 5;

function spawnCactus() {
    cacti.push(new Cactus(canvas));
}

function spawnCloud() {
    clouds.push(new Cloud(canvas));
}

function resetGame() {
    cacti = [];
    clouds = [];
    gameActive = true;
    gameState = 'PLAYING';
    gameSpeed = 5;
    spawnTimer = 0;
    cloudSpawnTimer = 0;
    scoreManager.reset();
    gameOverScreen.style.display = 'none';
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('score-board').style.display = 'block';
    animate();
}

function animate() {
    if (!gameActive || gameState !== 'PLAYING') return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Облака
    cloudSpawnTimer++;
    if (cloudSpawnTimer > 250) {
        spawnCloud();
        cloudSpawnTimer = 0;
    }

    for (let i = clouds.length - 1; i >= 0; i--) {
        clouds[i].update();
        clouds[i].draw(ctx);

        if (clouds[i].isOffscreen()) {
            clouds.splice(i, 1);
        }
    }

    // Динозавр
    dino.update();
    dino.draw(ctx);

    // Управление
    if (input.isJumpJustPressed()) {
        dino.jump();
        sounds.playJump();
    }

    // Кактусы
    spawnTimer++;
    if (spawnTimer > 100) {
        spawnCactus();
        spawnTimer = 0;
    }

    for (let i = cacti.length - 1; i >= 0; i--) {
        cacti[i].update();
        cacti[i].draw(ctx);

        // Столкновение
        if (
            dino.x < cacti[i].x + cacti[i].width &&
            dino.x + dino.width * 0.8 > cacti[i].x &&
            dino.y < cacti[i].y + cacti[i].height &&
            dino.y + dino.height * 0.8 > cacti[i].y
        ) {
            gameActive = false;
            gameState = 'GAMEOVER';
            sounds.playGameOver();
            gameOverScreen.style.display = 'block';
        }

        // Удаление кактусов за экраном
        if (cacti[i].isOffscreen()) {
            cacti.splice(i, 1);
            scoreManager.update(1);
        }
    }

    // Увеличение скорости со временем
    gameSpeed += 0.001;
    cacti.forEach(c => c.speed = gameSpeed);
    clouds.forEach(c => c.speed = gameSpeed / 3);

    requestAnimationFrame(animate);
}

// Слушатель для перезапуска
window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (gameState === 'START') {
            resetGame();
        } else if (gameState === 'GAMEOVER') {
            resetGame();
        }
    }
});

animate();
