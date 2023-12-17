import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const logout = () => localStorage.removeItem('token');

export const check = async () => {
    if (!localStorage.getItem('token')) return null;

    try{
        const {data, status} = await $authHost.get('api/user/auth');
        if (status >=400) {
            localStorage.removeItem('token');
            return null;
        }
        localStorage.setItem('token', data.token);
        return jwt_decode(data.token);
    }
    catch(e){
        console.log(e);
        localStorage.removeItem('token');
        return null;
    }
}
