import { Component } from "../../cola/component.js";
import { Utils } from "../../cola/utils.js";
import { NavComponent } from "../nav.js";
import { routes } from "../../cola/router.js";

export class Header extends Component {
    constructor(props) {
        super(props);
        this.mount(props.parent);
    }

    render() {
        const header = Utils.createElement('header', {}, []);
        new NavComponent({ routes: routes, parent: header });
        return header;
    }
}
