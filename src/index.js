import Particle from './Particle.js';
import World from './World.js';
import Renderer from './Renderer.js';


const world = new World();
world.initWorkers(4);
const renderer = new Renderer('#canvas', world);


// Demo data
const offsetX = 100;
const offsetY = 100;

for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
        world.add(new Particle(
            {
                x: x * 5 + offsetX, 
                y: y * 5 + offsetY
            },
            {
                x: (0.5 - Math.random()) / 100,
                y: (0.5 - Math.random()) / 100
            }
        ));
    }
}

world.optimiseChunks();

// Main loop
const stepsPerFrame = 20;
const dt = 0.001 / stepsPerFrame;
const ffps = 0;

const worldCycle = () => new Promise(resolve => {
    world.onWorldUpdate = resolve;
    world.updateParticles(dt);
});

async function update() {
    for (let i = 0; i < stepsPerFrame; i++) {
        await worldCycle();
    }
    
    renderer.renderParticles();
    requestAnimationFrame(update);
}

update();