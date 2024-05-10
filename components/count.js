import { Component } from '../cola/component.js';
import { Utils } from '../cola/utils.js';
import { Button } from '../cola/dom/button.js';
import { store } from '../cola/store.js';

export class Count extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    handleClick = () => {
        this.setState({ count: this.state.count + 1 });
        store.setData({ count: this.state.count });
    }

    render() {
        const { count } = this.state;
        const countElem = Utils.createElement('div', {}, [
            Utils.createElement('span', {}, [`Count: ${count}`])
        ]);
        const button = new Button({parent: countElem, value: 'click ici'});
        button.addEvent('click', this.handleClick.bind(this));

        return countElem;
    }
}
