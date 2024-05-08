import { store } from '../cola/store.js';

export class TestStore {
    constructor() {
        this.data = store.getData(); // Get initial data from the store
        store.on('dataUpdated', this.handleDataUpdated.bind(this)); // Subscribe to dataUpdated event
    }

    handleDataUpdated(data) {
        this.data = data;
    }
}
