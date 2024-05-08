import { Component } from '../cola/component.js';
import { Utils } from '../cola/utils.js';

export class ErrorPage extends Component {
    constructor(error = { code: 404, message: 'Page not found'}) {
        super();
        this.error = error;
    }

    render() {
        return Utils.createElement('div', {}, [
            Utils.createElement('h1', {}, [`Error: ${this.error.code}`]),
            Utils.createElement('p', {}, [`An error occurred: ${this.error.message}`]),
            Utils.createElement('p', {}, ['Please try again later.'])
        ]);
    }
}
