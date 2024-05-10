import { Component } from "../cola/Component.js";
import { Utils } from "../cola/utils.js";
import { Header } from './partials/header.js';

export class App extends Component {
    constructor(props) {
        super(props);
        this.parent = props.parent;
        this.mount(this.parent);
    }

    render() {
        const main = Utils.createElement('div', {}, []);
        const header = new Header({parent: main});
        const app = Utils.createElement('div', { id: 'app' }, []);

        main.appendChild(app);

        return main;
    }
}
