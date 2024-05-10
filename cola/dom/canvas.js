import { Component } from '../component.js';
import { Utils } from '../utils.js';

export class Canvas extends Component {
    constructor(props) {
        super(props);
        this.context = null;
        this.mount(props.parent);
    }

    render() {
        const canvas = Utils.createElement('canvas', this.props);
        this.context = canvas.getContext('2d');
        return canvas
    }

    getContext() {
        return this.context;
    }
    
    // Method to draw a rectangle
    drawRect(x, y, width, height, color) {
        const ctx = this.context;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
    }

    // Method to draw a line
    drawLine(x1, y1, x2, y2, color, lineWidth = 1) {
        const ctx = this.context;
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // Method to draw text
    drawText(text, x, y, font = '12px Arial', color = 'black') {
        const ctx = this.context;
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
    }

    // Method to draw an image
    drawImage(image, x, y, width, height) {
        const ctx = this.context;
        ctx.drawImage(image, x, y, width, height);
    }

    // Method to clear the canvas
    clearCanvas() {
        const ctx = this.context;
        ctx.clearRect(0, 0, this.element.width, this.element.height);
    }
}
