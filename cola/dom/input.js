import { Component } from "../component.js";
import { Utils } from "../utils.js";

export class Input extends Component {
    constructor (props) {
        super(props);
        this.label = props.label;
        this.name = props.name;
        this.type = props.type;
        this.value = props.value;
        this.error = '' !== props.error ? props.error : this.error;
        this.parentClass = props.parentClass;
        this.mount(props.parent);
    }

    addEvent(event, action) {
        this.event(event, action)
    }

    render() {
        const inputContainer = Utils.createElement('div', {}, [
            Utils.createElement('label', { for: this.name }, [this.label]),
            Utils.createElement('input', { type: this.type, id: this.name }, [this.value ? this.value : '']),
            Utils.createElement('p', { type: this.type }, [this.error ? this.error : ''])
        ]);

        inputContainer.addEventListener('input', (e) => {
            this.parentClass[this.name] = e.data;
            this.update();
        });


        return inputContainer;
    }
}