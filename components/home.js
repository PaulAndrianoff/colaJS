import { Component } from "../cola/component.js";
import { Utils } from "../cola/utils.js";
import { Count } from "./count.js";
import { Canvas } from "../cola/components/canvas.js";
import { store } from "../cola/store.js";

export class HomeComponent extends Component {
    render() {
        const home = Utils.createElement("div", {}, [
            Utils.createElement("h1", {}, ["Home Page"]),
        ]);

        const count = new Count();
        count.mount(home);

        const canvas = new Canvas({ parent: home, width: 400, height: 300 });
        // Draw a rectangle
        canvas.drawRect(50, 50, 100, 100, "red");

        // Draw a line
        canvas.drawLine(0, 0, 200, 200, "blue");

        // Draw text
        canvas.drawText("Hello, Canvas!", 50, 200);

        // Draw an image
        const img = new Image();
        img.src = this.config.assets + "image.webp";
        img.onload = () => {
            canvas.drawImage(img, 50, 50, 100, 100);
        };

        return home;
    }
}
