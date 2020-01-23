export default class Renderer {
    world = null;
    camera = null;
    canvas = null;
    context = null;
    width = null;
    height = null;

    constructor(selector, world) {
        this.world = world;
        this.canvas = document.querySelector(selector);
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    setWorld(newWorld) {
        this.world = newWorld;
    }

    renderParticles() {
        const ctx = this.context;
        ctx.clearRect(0, 0, this.width, this.height);

        for (let i = 0; i < this.world.particles.length; i++) {
            const p = this.world.particles[i];
            
            ctx.beginPath();
            ctx.arc(p.pos.x, p.pos.y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}