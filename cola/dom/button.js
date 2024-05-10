import { Component } from "../component.js";
import { Utils } from "../utils.js";

export class Button extends Component {
    constructor (props) {
        super(props);
        this.mount(props.parent);
    }

    addEvent(event, action) {
        this.event(event, action)
    }

    render() {
        return Utils.createElement('button', {}, [this.props.value]);
    }
}