import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router-dom';


function VerifyAuth(Component, redirect) {
    if (!!localStorage.getItem('auth_token')) {
        return <Component />;
    } else {
        return <Redirect to={redirect || '/login'} />;
    }
}

function MakeLogin(token) {
    localStorage.setItem('auth_token', token);
}

function MakeLogout() {
    localStorage.removeItem('auth_token');
}

export {
    VerifyAuth,
    MakeLogin,
    MakeLogout
};

