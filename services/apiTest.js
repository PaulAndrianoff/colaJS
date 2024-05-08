import { ApiService } from '../cola/apiService.js';
import { store } from '../cola/store.js';

export class ApiTest {
    async fetchData() {
        try {
            const customHeaders = {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Custom-Header': 'Custom-Value'
            };
            const data = await ApiService.get('https://dogapi.dog/api/v2/breeds', customHeaders);
            store.setData(data);
            return data.data;
        } catch (error) {
            console.log(error);
        }
        return { 'error': null }
    }

    async postData(data) {
        try {
            const customHeaders = {
                'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
                'Custom-Header': 'Custom-Value'
            };
            const response = await ApiService.post('https://api.example.com/endpoint', data, customHeaders);
            console.log('Response:', response);
            // Handle response or update component state
        } catch (error) {
            // Handle error
        }
    }
}
