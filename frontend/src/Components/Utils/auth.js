import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';

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
        window.location.href = to;
    }
}


