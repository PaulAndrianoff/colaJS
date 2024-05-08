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
                const li = Utils.createElement('li', {});
                const a = Utils.createElement('a', { href: `#${route.path}` }, [route.label]);
                li.appendChild(a);
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
