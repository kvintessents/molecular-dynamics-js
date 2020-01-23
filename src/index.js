import Particle from './Particle.js';
import World from './World.js';
import Renderer from './Renderer.js';


const world = new World();
const renderer = new Renderer('#canvas', world);

for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
        world.add(new Particle(
            {
                x: x * 5, 
                y: y * 5
            },
            {x: 0, y: 0}
        ));
    }
}

const dt = 0.00001;
update();

function update() {
    for (let i = 0; i < 20; i++) {
        world.updateParticles(dt);
    }
    
    renderer.renderParticles();
    requestAnimationFrame(update);
}