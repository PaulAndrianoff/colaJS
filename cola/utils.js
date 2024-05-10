export const Utils = {
    /**
     * @param {String} tag 
     * @param {Object} attributes 
     * @param {Array} children 
     * @returns 
     */
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

    /**
     * @param {String} title 
     */
    setDocumentTitle(title) {
        document.title = title;
    }
};