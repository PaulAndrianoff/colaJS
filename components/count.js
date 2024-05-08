import { Component } from '../cola/component.js';
import { Utils } from '../cola/utils.js';
import { Button } from '../cola/components/button.js';

export class Count extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    handleClick = () => { // Use arrow function
        this.setState({ count: this.state.count + 1 });
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
