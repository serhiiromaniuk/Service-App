import {
    VerifyAuth,
    MakeLogin,
    HandleLogin,
    MakeLogout,
    MakeReditect,
    opt
} from './auth';

import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';

export {
    VerifyAuth,
    MakeLogin,
    HandleLogin,
    MakeLogout,
    MakeReditect,
    opt
};

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

export function handlePermission(Component) {
    if (!localStorage.getItem('auth_token')) {
        return <Redirect to={Component} />;
    } else {
        const uuid = localStorage.getItem('auth_token');
        const url = api.get.auth.user.uuid;

        axios.get(url + uuid, opt).then(
            function(res) {
                if (res.data.roles[0].role === rolesMap.default) {
                    // return window.location.href = '/';
                } else {
                    return <Redirect to={Component} />;
                }
            }
        ).catch(
            function(error) {
                console.log(error.response.data)
            }
        );
    }
}

