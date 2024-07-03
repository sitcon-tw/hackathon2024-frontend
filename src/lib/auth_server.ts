'use server'
import axios from 'axios';
import { cookies } from 'next/headers';


export const isAuthenticatedServer = async () => {
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const cookieStore = cookies();
    try {
        const response = await api.get('is_logged', {
            headers: {
                cookie: `session=${cookieStore.get('session')?.value}`
            }
        });
        if (response.status === 200) {
            return response.data.team_name as string;
        }
        return null;
    }
    catch (exception) {
        if (exception instanceof Error)
            console.log(exception.message);
        throw exception;
    }
    // console.log(response);
}

export const getGameProgressServer = async () => {
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API,
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const cookieStore = cookies();
    try {
        const response = await api.get('team_info', {
            headers: {
                cookie: `session=${cookieStore.get('session')?.value}`
            }
        });
        if (response.status === 200) {
            return response.data.problem as number;
        }
        return null;
    }
    catch (exception) {
        if (exception instanceof Error)
            console.log(exception.message);
        throw exception;
    }
    // console.log(response);
}