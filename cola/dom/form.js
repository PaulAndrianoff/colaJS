import { Component } from "../component.js";
import { Utils } from "../utils.js";
import { Button } from "./button.js";
import { Input } from "./input.js";

export class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            errors: {},
        };
        this.mount(props.parent);
    }

    getState(stateKey, wantedKey) {
        if (undefined !== this.state[stateKey] && undefined !== this.state[stateKey][wantedKey]) {
            return this.state[stateKey][wantedKey];
        }

        return;
    }

    setState(keys, value) {
        this.state[keys] = value;
        this.update();
    }

    componentDidUpdate() {
        console.log('form update');
    }

    handleSubmit(event) {
        event.preventDefault();

        // Validate form fields before submission
        const isValid = this.validateFields();

        if (isValid) {
            console.log("Form submitted with data:", this.state.formData);
            // You can add form submission logic here
        } else {
            console.log("Form contains validation errors.");
        }
    }

    validateFields() {
        const { fields } = this.props;
        const errors = {};

        fields.forEach((field) => {
            const value = this.state.formData[field.name];
            if (field.validation) {
                if (true !== field.validation(value)) {
                    errors[field.name] = field.validation(value);
                }
            }
        });

        this.setState("errors", errors);
        return Object.keys(errors).length === 0;
    }

    render() {
        const fields = this.props.fields;
        const form = Utils.createElement("form", {}, []);
        fields.forEach(field => {
            new Input({
                parentClass: this,
                parent: form,
                name: field.name,
                label: field.label,
                type: field.type,
                value: this.getState('formData', field.name),
                error: this.getState('errors', field.name),
            })
        });

        const submitButton = new Button({ value: "Submit", parent: form });
        submitButton.addEvent("click", this.handleSubmit.bind(this));

        return form;
    }
}
