import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
});

export const login = async (token: string) => {
    const response = await api.post('login', { user_token: token });
    return response.status;
}

export const isAuthenticatedClient = async () => {
    const response = await api.get('is_logged');
    return response.status == 200;
}