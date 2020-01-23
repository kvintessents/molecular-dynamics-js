function getForcePotential(p0, p1, radius) {
    const { epsilon, sigma } = getEpsilonSigma(p0, p1);

    return 4 * epsilon * (
        Math.pow(sigma / radius, 12) - Math.pow(sigma / radius, 6)
    );
}

function getDistance(a, b) {
    return Math.sqrt(
        Math.pow(a.pos.x - b.pos.x, 2) + 
        Math.pow(a.pos.y - b.pos.y, 2)
    );
}

function getEpsilonSigma(a, b) {
    let epsilon = a.epsilon;
    let sigma = a.sigma;

    // Combination rule
    // if (a.name !== b.name) {
    //     epsilon = (a.epsilon + b.epsilon) / 2;
    //     sigma = Math.sqrt(a.sigma * b.sigma);
    // }

    return { epsilon, sigma }
}

export default class World {
    particles = [];

    add(particle) {
        this.particles.push(particle)
    }

    updateParticles(dt) {
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            let vx = p.pos.x - p.oldPos.x;
            let vy = p.pos.y - p.oldPos.y;

            p.oldPos.x = p.pos.x;
            p.oldPos.y = p.pos.y;

            let vljx = 0;
            let vljy = 0;
            
            for (let j = 0; j < this.particles.length; j++) {
                const p1 = this.particles[j];
                
                if (p === p1) {
                    continue;
                }

                const distance = getDistance(p, p1);
                const potential = getForcePotential(p, p1, distance) * dt;
                
                vljx += potential * (p.pos.x - p1.pos.x);
                vljy += potential * (p.pos.y - p1.pos.y);
            }

            p.pos.x += vx + vljx;
            p.pos.y += vy + vljy;
        }
    }


}