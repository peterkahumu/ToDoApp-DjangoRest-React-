import axios from 'axios';

// Create a custom Axios instance
const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: { 'Content-Type': 'application/json' }
});

class TodoDataService {
    setHeaders(token) {
        apiClient.defaults.headers.common['Authorization'] = `Token ${token}`;
    }

    getAll(token) {
        this.setHeaders(token);
        return apiClient.get('/todos/');
    }

    getTodo(id, token){
        this.setHeaders(token);
        return apiClient.get(`/todos/${id}/`);
    }

    createTodo(data, token) {
        this.setHeaders(token);
        return apiClient.post('/todos/', data);
    }

    updateTodo(id, data, token) {
        this.setHeaders(token);
        return apiClient.patch(`/todos/${id}/`, data);
    }

    deleteTodo(id, token) {
        this.setHeaders(token);
        return apiClient.delete(`/todos/${id}/`);
    }

    completeTodo(id, token) {
        this.setHeaders(token);
        return apiClient.put(`/todos/complete/${id}/`);
    }

    login(data) {
        return apiClient.post('/authenticate/login/', data);
    }

    register(data) {
        return apiClient.post('/authenticate/register/', data);
    }
}

export default new TodoDataService();