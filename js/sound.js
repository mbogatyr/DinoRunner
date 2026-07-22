class SoundManager {
    constructor() {
        this.context = null;
        this.deathScreamBuffer = null;
        this.yahooBuffer = null;
        this.deathScream = new Audio('assets/death-scream.m4a');
        this.deathScream.preload = 'auto';
        this.deathScream.load();
    }

    async init() {
        if (this.context) return;
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        
        try {
            const response1 = await fetch('assets/death-scream.m4a');
            const arrayBuffer1 = await response1.arrayBuffer();
            this.deathScreamBuffer = await this.context.decodeAudioData(arrayBuffer1);
            console.log("Death scream buffer loaded");

            const response2 = await fetch('assets/yahoo.mp3');
            const arrayBuffer2 = await response2.arrayBuffer();
            this.yahooBuffer = await this.context.decodeAudioData(arrayBuffer2);
            console.log("Yahoo buffer loaded");
        } catch (e) {
            console.error("Failed to load audio buffers:", e);
        }
    }

    playJump() {
        console.log("Звук прыжка");
        if (this.context && this.yahooBuffer && Math.random() < 0.25) {
            const source = this.context.createBufferSource();
            source.buffer = this.yahooBuffer;
            source.connect(this.context.destination);
            source.start(0);
        }
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
