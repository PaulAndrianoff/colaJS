import { Component } from '../cola/component.js';
import { Router } from '../cola/router.js';
import { Utils } from '../cola/utils.js';

export class NavComponent extends Component {
    constructor(props) {
        super(props);
        this.routes = props.routes;
        this.mount(props.parent);
    }

    createNavList() {
        const ul = Utils.createElement('ul', {});
        this.routes.forEach(route => {
            if (true === route.display) {
                const li = Utils.createElement('li', {}, [
                    Utils.createElement('a', { href: `#${route.link}` }, [route.label])
                ]);
                ul.appendChild(li);
            }
        });
        return ul;
    }

    render() {
        return Utils.createElement('nav', {}, [
            this.createNavList()
        ]);
    }
}
