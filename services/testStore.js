import { store } from '../cola/store.js';

export class TestStore {
    constructor() {
        this.data = store.getData();
        store.on('dataUpdated', this.handleDataUpdated.bind(this));
    }

    handleDataUpdated(data) {
        this.data = data;
        console.log(this.data);
    }
}
