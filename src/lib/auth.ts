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
  return response.status === 200;
}

export const isAuthenticatedClient = async () => {
  try {
    const response = await api.get('is_logged');
    return response.status === 200;
  }
  catch (exception) {
    throw exception;
  }
}

export const postAuthenticated = async (url: string, data: any) => {
  return await axios.post(url, data);
}