export class ApiService {
    static async get(url, headers = {}) {
        try {
            const response = await fetch(url, { headers });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    static async post(url, data, headers = {}) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers // Merge custom headers with default headers
                },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
}
