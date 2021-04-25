import {
    VerifyAuth,
    MakeLogin,
    HandleLogin,
    MakeLogout,
    GetUser,
    CreateUser,
    opt
} from './auth';

const ENVIRONMENT = 'development';
const api_url = process.env.BACKEND_URL || 'http://localhost:8000/api/v1/';
const api = {
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

export {
    ENVIRONMENT,
    api_url,
    api,
    VerifyAuth,
    MakeLogin,
    HandleLogin,
    MakeLogout,
    GetUser,
    CreateUser,
    opt
};
