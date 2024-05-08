class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(eventName, listener) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(listener);
    }

    emit(eventName, ...args) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(listener => listener(...args));
        }
    }
}

export class Store extends EventEmitter {
    constructor() {
        super();
        this.data = {}; // Initialize empty data object
    }

    setData(newData) {
        this.data = newData;
        this.emit('dataUpdated', this.data); // Emit event when data is updated
    }

    getData() {
        return this.data;
    }
}

// Singleton pattern to ensure only one instance of the store exists
export const store = new Store();
