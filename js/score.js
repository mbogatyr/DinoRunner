class ScoreManager {
    constructor() {
        this.score = 0;
        this.scoreElement = document.getElementById('score');
    }

    update(points) {
        this.score += points;
        this.scoreElement.innerText = this.score;
    }

    reset() {
        this.score = 0;
        this.scoreElement.innerText = this.score;
    }
}

const scoreManager = new ScoreManager();
