import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';

export const ENVIRONMENT = 'development';
export const api_url = process.env.BACKEND_URL || 'http://localhost:8000/api/v1/';
export const api = {
    ping: api_url + 'ping', 
    get: {
        block: {
            container: {
                id: api_url + 'block/container/get/',
                list: api_url + 'block/container/list'
            }
        },
        auth: {
            user: {
                uuid: api_url + 'auth/user/get/',
                list: api_url + 'auth/user/list'
            }
        }
    },
    post: {
        block: {
            container: {
                create: api_url + 'block/container/create'
            }
        },
        auth: {
            user: {
                create: api_url + 'auth/user/create',
                login: api_url + 'auth/user/login'
            },
            org: {
                create: api_url + 'auth/org/create'
            }
        }
    }
};

export const rolesMap = {
    default: 'default',
    manager: 'manager',
    admin: 'admin',
    owner: 'owner'
};

export function handlePermission(properUrl) {
    if (!localStorage.getItem('auth_token')) {
        MakeReditect('/')
    } else {
        const uuid = localStorage.getItem('auth_token');
        const url = api.get.auth.user.uuid;

        axios.get(url + uuid, opt).then(
            function(res) {
                if (res.data.roles[0].role === rolesMap.default) {
                    MakeReditect('/error');
                } else {
                    MakeReditect(properUrl);
                }
            }
        ).catch(
            function(error) {
                console.log(error.response.data)
            }
        );
    }
}

export const opt = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

export function HandleLogin(Component) {
    if (!!localStorage.getItem('auth_token')) {
        return <Redirect to='/' />;
    } else {
        return <Component />;
    }
}

export function VerifyAuth(Component, redirect) {
    if (!!localStorage.getItem('auth_token')) {
        return <Component />;
    } else {
        return <Redirect to={redirect || '/login'} />;
    }
}

export function MakeLogin(token) {
    localStorage.setItem('auth_token', token);
    window.location.href = '/';
}

export function MakeLogout() {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
}

export function MakeReditect(to) {
    if (!!localStorage.getItem('auth_token')) {
        window.location = to;
    } else {
        window.location = '/login';
    }
}

