import chunkArray from './chunkArray';

export default class World {
    particles = [];
    chunks = [];
    updates = [];
    workers = [];

    add(particle) {
        this.particles.push(particle);
    }

    optimiseChunks() {
        const particlesPerWorker = Math.floor(this.particles.length / this.workers.length);
        this.chunks = chunkArray(this.particles, particlesPerWorker);
    }

    initWorkers(num = 2) {
        if (typeof Worker === 'undefined') {
            throw new Error('Unsupported Browser');
        }

        for (let i = 0; i < num; i++) {
            const worker = new Worker('worker.js');
            worker.onmessage = this.registerUpdates.bind(this);
            this.workers.push(worker);
        }
    }

    registerUpdates(event) {
        this.updates[event.data.chunkIndex] = event.data.updates;

        if (this.updates.length && this.updates.length === this.chunks.length) {
            this.applyUpdates();
        }
    }

    applyUpdates() {
        const numChunks = this.updates.length;

        for (let i = 0; i < numChunks; i++) {
            const numParticles = this.updates[i].length;
            
            for (let j = 0; j < numParticles; j++) {
                const update = this.updates[i][j];
                const particle = this.chunks[i][j];

                particle.oldPos.x = particle.pos.x;
                particle.oldPos.y = particle.pos.y;
    
                particle.pos.x += update.x;
                particle.pos.y += update.y;
            }
        }

        this.updates = [];
    }

    updateParticles(dt) {
        this.chunks.forEach((chunk, i) => {
            this.workers[i].postMessage({
                chunk: chunk,
                allParticles: this.particles,
                chunkIndex: i,
                dt: dt
            });
        });
    }
}