class SoundManager {
    constructor() {
        // Здесь можно инициализировать аудио файлы
        // this.jumpSound = new Audio('assets/jump.mp3');
        // this.gameOverSound = new Audio('assets/gameover.mp3');
    }

    playJump() {
        console.log("Звук прыжка");
        // this.jumpSound.play();
    }

    playGameOver() {
        console.log("Звук проигрыша");
        // this.gameOverSound.play();
    }
}

const sounds = new SoundManager();
