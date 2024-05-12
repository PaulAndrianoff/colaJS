import { Component } from "./component.js";

/**
 * class Router
 */
export class Router extends Component {
    constructor(routes) {
        super();
        this.routes = routes;
        this.defaultPath = '/';
        this.errorPath = '/error';
        this.currentRoute = null;
        window.addEventListener('popstate', this.handleRouteChange.bind(this));
    }

    /**
     * Method to get current path
     */
    handleRouteChange() {
        const path = window.location.hash.slice(1); // Remove the leading '#' from the hash fragment
        if ('' === path) {
            this.navigateTo(this.defaultPath);
            return;
        }
        this.navigateTo(path);
    }

    /**
     * Method to render current path
     * @param {String} path
     * If not found navigate to errorPath
     */
    navigateTo(path) {
        const matchedRoute = this.matchRoute(path);
        if (matchedRoute) {
            if (this.currentRoute && this.currentRoute.component) {
                this.currentRoute.component.unmount();
            }
            this.currentRoute = matchedRoute;
            this.currentRoute.component.isMounted = false;
            this.currentRoute.component.props = this.currentRoute.param;
            this.currentRoute.component.mount();
        } else {
            this.navigateTo(this.errorPath);
        }
    }

    /**
     * @param {String} path 
     * @returns 
     */
    matchRoute(path) {
        let matchedRoute = null;
        for (const route of this.routes) {
            const pattern = new RegExp('^' + route.path.replace(/\{([^}]+)\}/g, '([^/]+)') + '$');
            const matches = path.match(pattern);
            if (matches) {
                const keys = route.path.match(/\{([^}]+)\}/g);
                const param = {};
                if (keys) {
                    keys.forEach((key, index) => {
                        param[key.slice(1, -1)] = matches[index + 1];
                    });
                }
                matchedRoute = { ...route, param };
                break; // Stop after finding the first match
            }
        }
        
        return matchedRoute;
    }    
}

export const routes = [];