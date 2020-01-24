let incrementedId = 0;

export default class Particle {
    name = 'Argon';
    pos = {x: 0, y: 0};
    oldPos = {x: 0, y: 0};
    epsilon = 0.997; // kJ/mol
    sigma = 3.40;
    mass = 1;
    id = incrementedId++;

    constructor(position, initVelocity) {
        this.pos = position;
        this.oldPos.x = this.pos.x - initVelocity.x;
        this.oldPos.y = this.pos.y - initVelocity.y;
    }
}
