export const Utils = {
    createElement(tag, attributes, children) {
        const element = document.createElement(tag);
        Object.keys(attributes).forEach(key => {
            element.setAttribute(key, attributes[key]);
        });
        if (children) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });
        }
        return element;
    },

    setDocumentTitle(title) {
        document.title = title;
    }
};