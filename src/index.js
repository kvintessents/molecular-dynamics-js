import Particle from './Particle.js';
import World from './World.js';
import Renderer from './Renderer.js';
import UserParticleCreator from './UserParticleCreator.js';


const world = new World();
world.initWorkers(4);
const renderer = new Renderer('#canvas', world);

// Demo data
const offsetX = 100;
const offsetY = 100;
const dist = 3.4;
for (let x = 0; x < 20; x++) {
    for (let y = 0.5; y < 20; y++) {
        world.add(new Particle(
            {
                x: x * dist + offsetX, 
                y: y * dist + offsetY
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
const stepsPerFrame = 10;
const dt = 0.01 / stepsPerFrame;
const ffps = 1;

const worldCycle = () => new Promise(resolve => {
    world.onWorldUpdate = resolve;
    world.updateParticles(dt);
});

async function update() {
    for (let i = 0; i < stepsPerFrame; i++) {
        await worldCycle();
    }
    
    renderer.renderParticles();

    // setTimeout(update, 1000 / ffps);
    requestAnimationFrame(update);
}

update();
