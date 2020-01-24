import Particle from './Particle.js';
import World from './World.js';
import Renderer from './Renderer.js';


const world = new World();
world.initWorkers(4);
const renderer = new Renderer('#canvas', world);


// Demo data
const offsetX = 100;
const offsetY = 100;

for (let x = 0; x < 30; x++) {
    for (let y = 0; y < 20; y++) {
        world.add(new Particle(
            {
                x: x * 4 + offsetX, 
                y: y * 4 + offsetY
            },
            {
                x: (0.5 - Math.random()) / 10,
                y: (0.5 - Math.random()) / 10
            }
        ));
    }
}

world.optimiseChunks();

// Main loop
const stepsPerFrame = 1;
const dt = 0.0001 / stepsPerFrame;
const ffps = 0;

function update() {
    for (let i = 0; i < stepsPerFrame; i++) {
        world.updateParticles(dt);
    }
    
    renderer.renderParticles();

        requestAnimationFrame(update);
}

update();