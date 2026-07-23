const cactusImages = [];
for (let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/cactus${i}.png`;
    cactusImages.push(img);
}

class Cactus {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 40;
        this.height = 60;
        this.x = canvas.width;
        this.y = canvas.height - this.height;
        this.speed = 5;
        
        this.image = cactusImages[Math.floor(Math.random() * cactusImages.length)];

        this.hitboxWidth = 30;
        this.hitboxHeight = 50;
    }

    update(dt) {
        this.x -= this.speed * dt;
    }

    draw(ctx) {
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = '#2ecc71';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    isOffscreen() {
        return this.x + this.width < 0;
    }
}
