export class Router {
    constructor(routes) {
        this.routes = routes;
        this.hasChange = true;

        window.addEventListener('hashchange', this.loadRoute.bind(this));
    }

    clear () {
        document.querySelector('#app').innerHTML = '';
    }

    loadRoute(clear = true) {
        const path = window.location.hash.slice(1) || '/';
        const route = this.routes.find(r => r.path === path);

        if (clear) this.clear();

        if (route) {
            route.handler();
        } else {
            this.navigate('/error');
        }
    }

    navigate(route) {
        window.location.hash = route;
    }
}

export const routes = [];