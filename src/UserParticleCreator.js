class UserParticleCreator {
    constructor() {
        this.canvas = document.querySelector('#canvas');
        this.canvas.on('mousedown', this.onMouseDown.bind(this));
        this.canvas.on('mouseup', this.onMouseUp.bind(this));
        this.canvas.on('mousemove', this.onMouseMove.bind(this));
    }

    onMouseDown(event) {
        console.log(event);
    }
}
