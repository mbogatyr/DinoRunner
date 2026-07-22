class Dinosaur {
    constructor(canvas) {
        this.canvas = canvas;
        this.width = 40;
        this.height = 40;
        this.x = 50;
        this.y = canvas.height - this.height;
        this.color = '#535353';
        
        this.gravity = 0.6;
        this.jumpPower = -12;
        this.velocity = 0;
        this.isJumping = false;
        this.grounded = true;

        this.leftImg = new Image();
        this.leftImg.src = 'assets/Chrome_T-Rex_Left_Run.webp';
        this.rightImg = new Image();
        this.rightImg.src = 'assets/Chrome_T-Rex_Right_Run.webp';

        this.currentFrame = 0; // 0 for left, 1 for right
        this.lastFrameTime = 0;
        this.frameDuration = 100; // ms

        this.hitboxWidth = 30;
        this.hitboxHeight = 30;
    }

    jump() {
        if (this.grounded) {
            this.velocity = this.jumpPower;
            this.isJumping = true;
            this.grounded = false;
        }
    }

    update() {
        this.velocity += this.gravity;
        this.y += this.velocity;

        // Столкновение с землей
        if (this.y + this.height > this.canvas.height) {
            this.y = this.canvas.height - this.height;
            this.velocity = 0;
            this.isJumping = false;
            this.grounded = true;
        }

        // Анимация бега
        const currentTime = Date.now();
        if (currentTime - this.lastFrameTime > this.frameDuration) {
            this.currentFrame = (this.currentFrame + 1) % 2;
            this.lastFrameTime = currentTime;
        }
    }

    draw(ctx) {
        if (this.leftImg.complete && this.rightImg.complete) {
            const img = this.currentFrame === 0 ? this.leftImg : this.rightImg;
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}
