const axios = require('axios');
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
            },
            role: {
                list: api_url + 'auth/role/list'
            },
            org: {
                id: api_url + 'auth/org/get/',
                list: api_url + 'auth/org/list'
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
const urlUser = api.get.auth.user.uuid;
const urlRole = api.get.auth.role.list;
const rolesMap = {
    default: 1,
    manager: 2,
    admin: 3,
    owner: 4
};

const uuid = '29019fbc-29aa-4855-a4c1-0c0c4a9a4984'
const permission = 'manager';
const opt = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

axios.get(urlRole, opt).then(
    function(res) {
        const authRolesMap = JSON.parse(res.data);

        // Get User role and compare to `permission`
        axios.get(urlUser + uuid, opt).then(
            function(res) {
                var arr = [];
                const userRoleId = res.data.role_id;

                for (var [ key, value ] in rolesMap) {
                    arr.push(rolesMap[value]);
                }
                const map = arr.slice(arr.indexOf(permission));
                    

                for (var key in map) {
                    
                }
                if ( userRoleId === extId ) {
                    if (map.includes(userRole)) {
                        makeReditect(properUrl);
                    } else {
                        makeReditect('/error');
                    }
                }

            }
        ).catch(
            function(error) {
                console.log(error)
            }
        );
    }
).catch(
    function(error) {
        console.log(error)
    }
);
































































