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
let lastTimestamp = 0;

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
    
    // Initialize sound context on user interaction
    sounds.init();
    
    animate();
}

function animate(timestamp) {
    if (!gameActive || gameState !== 'PLAYING') return;

    if (!timestamp) {
        requestAnimationFrame(animate);
        return;
    }

    if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
        requestAnimationFrame(animate);
        return;
    }

    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;
    // Cap dt to avoid huge jumps (e.g., after tab switch)
    const dt = Math.min(Math.max(1, deltaTime / 16.67), 5);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Облака
    cloudSpawnTimer += dt;
    if (cloudSpawnTimer > 250) {
        spawnCloud();
        cloudSpawnTimer = 0;
    }

    for (let i = clouds.length - 1; i >= 0; i--) {
        clouds[i].update(dt);
        clouds[i].draw(ctx);

        if (clouds[i].isOffscreen()) {
            clouds.splice(i, 1);
        }
    }

    // Динозавр
    dino.update(dt);
    dino.draw(ctx);

    // Управление
    if (input.isJumpJustPressed()) {
        dino.jump();
        sounds.playJump();
    }

    // Кактусы
    spawnTimer += dt;
    if (spawnTimer > 100) {
        spawnCactus();
        spawnTimer = 0;
    }

    for (let i = cacti.length - 1; i >= 0; i--) {
        cacti[i].update(dt);
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
    gameSpeed += 0.001 * dt;
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
