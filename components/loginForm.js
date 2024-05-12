import { Component } from "../cola/component.js";
import { Utils } from "../cola/utils.js";
import { Form } from "../cola/dom/form.js";

export class LoginForm extends Component {
    constructor(props) {
        super(props);
    }

    // Custom validation function for username
    validateUsername(value) {
        // Custom validation logic for username (e.g., length, allowed characters)
        if (undefined === value) return 'Username not defined';
        if (value.length < 4 || value.length > 20) return 'Username is not valid';
        return true; // if nothing wrong
    }

    // Custom validation function for password
    validatePassword(value) {
        // Custom validation logic for password (e.g., length, complexity)
        if (undefined === value) return 'Password not defined';
        if (value.length < 6) return 'Password is wrong';
        return true;
    }

    render() {
        const fields = [
            { label: 'Username', type: 'text', name: 'username', validation: this.validateUsername },
            { label: 'Password', type: 'password', name: 'password', validation: this.validatePassword }
        ];
        
        const formContainer = Utils.createElement('div', {}, []);
        const form = new Form({ fields: fields, parent: formContainer });

        return formContainer;
    }
}
