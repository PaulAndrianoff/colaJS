import { store } from "./store.js";
import { config } from "../config.js";
import { routes } from "./router.js";

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

    getConfig () {
        return config;
    }

    getRoutes () {
        return routes;
    }

    getStore () {
        return store;
    }

    // Lifecycle method: Called when the component will mount to the DOM
    componentWillMount() { }

    // Lifecycle method: Called when the component is mounted to the DOM
    componentDidMount() { }

    // Lifecycle method: Called when the component is updated
    componentDidUpdate() { }

    // Lifecycle method: Called when the component is about to be unmounted from the DOM
    componentWillUnmount() { }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        if (false === this.isMounted) {
            this.mount();
        } else {
            this.update();
        }
    }

    render() {
        throw new Error('You must implement the render method');
    }

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

    update() {
        const newVirtualElement = this.render();
        const patches = this.diff(this.element, newVirtualElement);
        this.patch(this.element, patches);
        this.virtualElement = newVirtualElement;
        this.componentDidUpdate();
    }

    unmount() {
        this.componentWillUnmount();
        this.element.remove();
    }

    setParent(parent) {
        if (typeof parent === 'string') {
            this.parent = document.querySelector(parent);
        } else {
            this.parent = parent;
        }
    }

    diff(oldNode, newNode) {
        const patches = [];
        this.diffNodes(oldNode, newNode, patches, 0);
        return patches;
    }

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

    patch(node, patches) {
        // Apply each patch to the node
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
        

    event(event, listener) {
        this.element.addEventListener(event, listener);
    }
}
