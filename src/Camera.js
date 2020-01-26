export default class Camera {
    zoom = 2;
    pos = {
        x: -100,
        y: -100,
    };
    minZoomLevel = 0.3;
    maxZoomLevel = 5;

    addZoom(value) {
        this.zoom += value;
        
        if (this.zoom < this.minZoomLevel) {
            this.zoom = this.minZoomLevel;
        }
        
        if (this.zoom > this.maxZoomLevel) {
            this.zoom = this.maxZoomLevel;
        }
    }

    addPosition(x, y) {
        this.pos.x += x;
        this.pos.y += y;
    } 
}