export default class UserController {
    mouseLastX = null;
    mouseLastY = null;
    canvasX = 0;
    canvasY = 0;

    constructor(selector, camera) {
        this.camera = camera;
        this.canvas = document.querySelector(selector);

        this.updateCanvasPosition();

        this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this));
        this.canvas.addEventListener('wheel', this.onWheel.bind(this));
    }

    updateCanvasPosition() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvasX = rect.left;
        this.canvasY = rect.top;
    }

    onMouseDown(event) {
        this.isMouseDown = true;
    }

    onMouseUp(event) {
        this.isMouseDown = false;
    }

    onDocumentMouseMove(event) {
        if (!this.isMouseDown) {
            return true;
        }

        event.preventDefault();

        this.camera.addPosition(
            event.movementX / this.camera.zoom,
            event.movementY / this.camera.zoom
        );
    }

    onWheel(event) {
        event.preventDefault();
        
        const prevZoom = this.camera.zoom;
        const amount = -event.deltaY / 1000 * this.camera.zoom;
        
        this.camera.addZoom(amount);

        // This should be in camera
        if (this.camera.zoom !== prevZoom) {
            this.camera.addPosition(
                -(event.clientX - this.canvasX) / 2 * amount / prevZoom,
                -(event.clientY - this.canvasY) / 2 * amount / prevZoom,
            );
        }
    }
}
