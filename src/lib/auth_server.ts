'use server'
import axios from 'axios';
import { cookies } from 'next/headers';


export const isAuthenticatedServer = async () => {
    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const cookieStore = cookies();
    const response = await api.get('is_logged', {
        headers: {
            cookie: `session=${cookieStore.get('session')?.value}`
        }
    });
    // console.log(response);
    return response.status == 200;
}