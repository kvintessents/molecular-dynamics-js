export default class Renderer {
    world = null;
    camera = null;
    canvas = null;
    context = null;
    width = null;
    height = null;

    constructor(selector, world, camera) {
        this.world = world;
        this.camera = camera;
        this.canvas = document.querySelector(selector);
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    }

    render(dt) {
        const ctx = this.context;
        ctx.fillStyle = `rgb(20, 20, 20)`;
        ctx.fillRect(0, 0, this.width, this.height);

        this.renderParticles(ctx, dt);
        // this.renderCamera(ctx);
    }

    renderParticles(ctx, dt) {
        const zoom = this.camera.zoom;
        const offset = this.camera.pos;

        for (let i = 0; i < this.world.particles.length; i++) {
            const p = this.world.particles[i];

            // let invv = 1 / (Math.sqrt(
            //     Math.pow(p.pos.x - p.oldPos.x, 2) + Math.pow(p.pos.y - p.oldPos.y, 2)
            // ) * dt);
            
            ctx.beginPath();

            ctx.arc(
                (p.pos.x + offset.x) * zoom,
                (p.pos.y + offset.y) * zoom,
                p.sigma / 2.2 * zoom,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = `rgb(250, 0, 100)`;
            ctx.fill();
        }
    }

    // renderCamera(ctx) {
    //     ctx.beginPath();
    // }
}