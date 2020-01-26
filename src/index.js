import Particle from './Particle';
import World from './World';
import Renderer from './Renderer';
import UserController from './UserController';
import Camera from './Camera';

const world = new World();
world.initWorkers(4);
const camera = new Camera();
const renderer = new Renderer('#canvas', world, camera);
const userController = new UserController('#canvas', camera);

// Demo data
const offsetX = 220;
const offsetY = 220;
const dist = 4.4;

for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
        world.add(new Particle(
            {
                x: x * dist + offsetX, 
                y: y * dist + offsetY
            },
            {
                x: (0.5 - Math.random()) / 1000,
                y: (0.5 - Math.random()) / 1000
            }
        ));
    }
}

world.optimiseChunks();

// Main loop
const stepsPerFrame = 10;
const dt = 0.0001 / stepsPerFrame;
const ffps = 1;

const worldCycle = () => new Promise(resolve => {
    world.onWorldUpdate = resolve;
    world.updateParticles(dt);
});

async function update() {
    for (let i = 0; i < stepsPerFrame; i++) {
        await worldCycle();
    }
    
    renderer.render(dt);

    // setTimeout(update, 1000 / ffps);
    requestAnimationFrame(update);
}

update();
