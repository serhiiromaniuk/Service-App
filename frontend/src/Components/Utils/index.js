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

export function handlePermission(properUrl, permission = rolesMap.default) {
    const auth_token = localStorage.getItem('auth_token');
    if (!auth_token) {
        makeReditect('/')
    } else {
        const uuid = auth_token.token;
        const url = api.get.auth.user.uuid;

        axios.get(url + uuid, opt).then(
            function(res) {
                if (res.data.roles[0].role === permission) {
                    makeReditect('/error');
                } else {
                    makeReditect(properUrl);
                }
            }
        ).catch(
            function(error) {
                console.log(error)
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

export function handleLogin(Component) {
    const auth_token = !!localStorage.getItem('auth_token');
    if (auth_token) {
        return <Redirect to='/' />;
    } else {
        return <Component />;
    }
}

export function verifyAuth(Component, redirect) {
    const auth_token = localStorage.getItem('auth_token');
    const now = new Date()

    if (!!auth_token) {
        if (now.getTime() > auth_token.expire) {
            localStorage.removeItem('auth_token')
            return <Redirect to={redirect || '/login'} />;
        } else {
            return <Component />;
        }
    } else {
        return <Redirect to={redirect || '/login'} />;
    }
}

export function makeLogin(token, ttl = 3600) {
    const now = new Date()

    const auth_token = {
        value: token,
        expire: now.getTime() + ttl
    }

    localStorage.setItem('auth_token', auth_token);
    window.location = '/';
}

export function makeLogout() {
    localStorage.removeItem('auth_token');
    window.location.href = '/login';
}

export function makeReditect(to) {
    const auth_token = !!localStorage.getItem('auth_token');
    if (auth_token) {
        window.location = to;
    } else {
        window.location = '/login';
    }
}

