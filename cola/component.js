import { store } from "./store.js";
import { config } from "../config.js";
import { routes } from "./router.js";

/**
 * class Component
 */
export class Component {
    constructor(props) {
        this.props = props;
        this.state = {};
        this.parent = null;
        this.virtualElement = null;
        this.element = null;
        this.isMounted = false;
        this.willMount = false;
        this.store = this.getStore();
        this.routes = this.getRoutes();
        this.config = this.getConfig();
    }

    /**
     * @returns {Array}
     */
    getConfig () {
        return config;
    }

    /**
     * @returns {Array}
     */
    getRoutes () {
        return routes;
    }

    /**
     * @returns {Store}
     */
    getStore () {
        return store;
    }

    /**
     * @param {String} path 
     */
    goTo(path) {
        window.history.pushState(null, null, '#' + path);
        window.location.reload()
    }

    // Lifecycle method: Called when the component will mount to the DOM
    componentWillMount() { }

    // Lifecycle method: Called when the component is mounted to the DOM
    componentDidMount() { }

    // Lifecycle method: Called when the component is updated
    componentDidUpdate() { }

    // Lifecycle method: Called when the component is about to be unmounted from the DOM
    componentWillUnmount() { }

    /**
     * @param {Any} newState 
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        if (false === this.isMounted) {
            this.mount();
        } else {
            this.update();
        }
    }

    /**
     * @throws {Error} if method not implemented
     */
    render() {
        throw new Error('You must implement the render method');
    }

    /**
     * Method called when component is mount
     * @param {String} parent 
     * @returns
     */
    mount(parent = '#app') {
        if (true === this.willMount) {
            this.willMount = !this.willMount;
            this.componentWillMount();
            return;
        }
        this.setParent(parent);
        const newVirtualElement = this.render();
        this.element = this.render();
        this.virtualElement = newVirtualElement;
        if (!this.isMounted) {
            this.parent.appendChild(this.element);
            this.isMounted = true;
            this.componentDidMount();
        }
    }

    /**
     * Called when state is updated
     */
    update() {
        const newVirtualElement = this.render();
        const patches = this.diff(this.element, newVirtualElement);
        this.patch(this.element, patches);
        this.virtualElement = newVirtualElement;
        this.componentDidUpdate();
    }

    /**
     * Method to remove DOM element
     */
    unmount() {
        this.componentWillUnmount();
        this.element.remove();
    }

    /**
     * @param {String|Object} parent 
     */
    setParent(parent) {
        if (typeof parent === 'string') {
            this.parent = document.querySelector(parent);
        } else {
            this.parent = parent;
        }
    }

    /**
     * Method to get differences between oldNode and newNode
     * @param {Object} oldNode 
     * @param {Object} newNode 
     * @returns {Array}
     */
    diff(oldNode, newNode) {
        const patches = [];
        this.diffNodes(oldNode, newNode, patches, 0);
        return patches;
    }

    /**
     * @param {Object} oldNode 
     * @param {Object} newNode 
     * @param {Array} patches 
     * @param {Int} index 
     */
    diffNodes(oldNode, newNode, patches, index) {
        if (!oldNode || !newNode) {
            // If one of the nodes is missing, add a replace patch
            patches.push({ type: 'replace', oldNode: oldNode, newNode: newNode, index });
        } else if (oldNode.nodeType !== newNode.nodeType || oldNode.nodeName !== newNode.nodeName) {
            // If node types or names are different, add a replace patch
            patches.push({ type: 'replace', oldNode: oldNode, newNode: newNode, index });
        } else if (oldNode.nodeType === Node.TEXT_NODE) {
            // If both nodes are text nodes, compare their text content
            if (oldNode.textContent !== newNode.textContent) {
                patches.push({ type: 'text', oldNode: oldNode, newNode: newNode, text: newNode.textContent, index });
            }
        } else {
            // Compare attributes of element nodes
            const attrPatches = this.diffAttributes(oldNode, newNode);
            if (attrPatches.length > 0) {
                patches.push({ type: 'attributes', attrPatches, index });
            }

            // Recursively compare children of element nodes
            const oldChildren = Array.from(oldNode.childNodes);
            const newChildren = Array.from(newNode.childNodes);
            const maxLength = Math.max(oldChildren.length, newChildren.length);
            for (let i = 0; i < maxLength; i++) {
                this.diffNodes(oldChildren[i], newChildren[i], patches, i);
            }
        }
    }

    /**
     * @param {Object} oldNode 
     * @param {Object} newNode 
     * @returns {Array}
     */
    diffAttributes(oldNode, newNode) {
        const attrPatches = [];
        const oldAttrs = Array.from(oldNode.attributes);
        const newAttrs = Array.from(newNode.attributes);

        oldAttrs.forEach(oldAttr => {
            const newAttr = newNode.getAttribute(oldAttr.name);
            if (newAttr === null) {
                attrPatches.push({ type: 'remove', name: oldAttr.name, oldNode: oldNode, newNode: newNode });
            } else if (oldAttr.value !== newAttr) {
                attrPatches.push({ type: 'update', name: oldAttr.name, value: newAttr , oldNode: oldNode, newNode: newNode});
            }
        });

        newAttrs.forEach(newAttr => {
            if (!oldNode.hasAttribute(newAttr.name)) {
                attrPatches.push({ type: 'add', name: newAttr.name, value: newAttr.value, oldNode: oldNode, newNode: newNode });
            }
        });

        return attrPatches;
    }

    /**
     * Apply each patch to the node
     * @param {Object} node 
     * @param {Array} patches 
     */
    patch(node, patches) {
        patches.forEach(patch => {
            switch (patch.type) {
                case 'replace':
                    if (patch.node instanceof Node && node.parentNode) {
                        oldNode.parentNode.replaceChild(patch.newNode, patch.oldNode);
                    } else {
                        throw new Error('Invalid node for replacement');
                    }
                    break;
                case 'text':
                    patch.oldNode.textContent = patch.text;
                    break;
                case 'attributes':
                    if (node.parentNode) {
                        patch.attrPatches.forEach(attrPatch => {
                            switch (attrPatch.type) {
                                case 'add':
                                    node.setAttribute(attrPatch.name, attrPatch.value);
                                    break;
                                case 'remove':
                                    node.removeAttribute(attrPatch.name);
                                    break;
                                case 'update':
                                    node.setAttribute(attrPatch.name, attrPatch.value);
                                    break;
                            }
                        });
                    } else {
                        throw new Error('Parent node is null');
                    }
                    break;
                default:
                    throw new Error('Invalid patch type');
            }
        });
    }
        
    /**
     * @param {String} event 
     * @param {Function} listener 
     */
    event(event, listener) {
        this.element.addEventListener(event, listener);
    }
}
