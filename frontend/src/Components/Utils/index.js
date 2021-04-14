const ENVIRONMENT = 'development';
const backend_url = process.env.BACKEND_URL || 'http://localhost:8000/api/v1/';
const backend = {
    get: {
        ping: backend_url + 'ping', 
        user_by_id: backend_url + 'users/',
        list: backend_url + 'auth/list'
    },
    post: {
        create_user: backend_url + 'auth/create/user',
        create_org: backend_url + 'auth/create/org'
    }
}

export {
    ENVIRONMENT,
    backend_url,
    backend
};