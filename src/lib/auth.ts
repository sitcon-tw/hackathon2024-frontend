import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  },
});

export const login = async (token: string) => {
  try {
    const response = await api.post('login', { user_token: token });
    return response.status === 200;
  }
  catch (exception) {
    return undefined;
  }
}

export const isAuthenticatedClient = async () => {
  try {
    const response = await api.get('is_logged');
    return response.status === 200;
  }
  catch (exception) {
    return undefined;
  }
}

export const postAuthenticated = async (url: string, data: any) => {
  try {
    return await axios.post(url, data);
  }
  catch (exception) {
    return undefined;
  }
}