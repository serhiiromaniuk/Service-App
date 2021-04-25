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

export function GetUser(url, info) {
    const [ response, setResponse ] = React.useState([]);
    
    axios.get(url, opt).then(
        function(res) {
            if (res.status != '200') {
                setResponse(res.data)
            } else {
                setResponse([
                    'Some error occured, url: ' + 
                    url
                ])
            }
        }
    );
    
    if (!!info) {
        return response[info];
    } else {
        return response;
    }
}

export function CreateUser(url, userdata, info) {
    const [ respone, setResponse ] = React.useState([]);

    if (!!userdata) {
        axios.post(url, userdata, opt).then(
            function(res) {
                if (res.status != '200') {
                    setResponse(res.data)
                } else {
                    setResponse([
                        'Some error occured, url: ' + 
                        url +
                        ' userdata: ' + userdata])
                }
            } 
        );
    } else {
        setResponse(
            'Some error occured, url: ' + 
            url +
            ' userdata: ' + userdata)
    }

    if (!!info) {
        return response[info];
    } else {
        return response;
    }
}


