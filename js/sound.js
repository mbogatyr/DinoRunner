class SoundManager {
    constructor() {
        this.context = null;
        this.deathScreamBuffer = null;
        this.deathScream = new Audio('assets/death-scream.m4a');
        this.deathScream.preload = 'auto';
        this.deathScream.load();
    }

    async init() {
        if (this.context) return;
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        
        try {
            const response = await fetch('assets/death-scream.m4a');
            const arrayBuffer = await response.arrayBuffer();
            this.deathScreamBuffer = await this.context.decodeAudioData(arrayBuffer);
            console.log("Death scream buffer loaded");
        } catch (e) {
            console.error("Failed to load death scream buffer:", e);
        }
    }

    playJump() {
        console.log("Звук прыжка");
        // If jump sound was here, I'd use same logic as playGameOver
    }

    async playGameOver() {
        console.log("Звук проигрыша");
        
        if (!this.context) {
            await this.init();
        }

        if (this.context.state === 'suspended') {
            await this.context.resume();
        }

        if (this.deathScreamBuffer) {
            const source = this.context.createBufferSource();
            source.buffer = this.deathScreamBuffer;
            source.connect(this.context.destination);
            source.start(0);
        } else {
            // Fallback to HTMLAudioElement if buffer is still loading
            this.deathScream.currentTime = 0;
            this.deathScream.play().catch(e => console.log("Audio play failed:", e));
        }
    }
}

const sounds = new SoundManager();
