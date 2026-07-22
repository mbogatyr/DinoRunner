class InputManager {
    constructor() {
        this.jumpPressed = false;
        this.jumpJustPressed = false;
        
        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                this.jumpPressed = true;
                this.jumpJustPressed = true;
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            if (e.code === 'Space') {
                this.jumpPressed = false;
                this.jumpJustPressed = false;
            }
        });
    }

    isJumpPressed() {
        return this.jumpPressed;
    }

    isJumpJustPressed() {
        if (this.jumpJustPressed) {
            this.jumpJustPressed = false;
            return true;
        }
        return false;
    }
}

const input = new InputManager();
