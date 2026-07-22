const cloudImage = new Image();
cloudImage.src = 'assets/Chromium_T-Rex-cloud.png';

class Cloud {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 100;
        this.height = 60;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height - 40) + 20;
        this.speed = 0;
    }

    update() {
        this.x -= this.speed;
    }

    draw(ctx) {
        if (cloudImage.complete) {
            ctx.drawImage(cloudImage, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = '#bdc3c7';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    isOffscreen() {
        return this.x + this.width < 0;
    }
}
