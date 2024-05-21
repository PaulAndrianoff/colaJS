import { ApiService } from '../cola/apiService.js';
import { store } from '../cola/store.js';

export class ApiProvider {
    async fetchData(url) {
        try {
            const customHeaders = {
                origin: "http://localhost:8000",
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Custom-Header': 'Custom-Value'
            };
            const data = await ApiService.get(url, customHeaders);
            store.setData(data);
            return data.data;
        } catch (error) {
            console.log(error);
        }
        return { 'error': null }
    }

    async postData(url, data) {
        try {
            const customHeaders = {
                origin: "http://localhost:8000",
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Custom-Header': 'Custom-Value'
            };
            const response = await ApiService.post(url, data, customHeaders);
            console.log('Response:', response);
            // Handle response or update component state
        } catch (error) {
            // Handle error
        }
    }
}
