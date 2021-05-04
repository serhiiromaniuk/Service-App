const axios = require('axios')
const api_url = process.env.BACKEND_URL || 'http://localhost:8000/api/v1/'
const api = {
    ping: api_url + 'ping', 
    get: {
        block: {
            container: {
                id: api_url + 'block/container/get/id/',
                owner: api_url + 'block/container/get/owner/',
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
const opt = {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
}


function getUsers() {
    var url = api.get.auth.user.list
    axios.get(url, opt).then(
            function(res) {
                console.log(res.data)
            }
        ).catch(
            function(error) {
                console.log(error.response.data)
            }
        )
} 
// getUsers()


function createUser() {
    var data = {
        username:   "testaxios",
        email:      "test.axios@co.c",
        country:    "UA",
        password:   "testaxios"
    }
    var url = api.post.auth.user.create
    axios.post(url, data, opt).then(
            function(res) {
                console.log(res.data)
            }
        ).catch(
            function(error) {
                console.log(error.response.data)
            }
        )
} 

// /api/v1/auth/user/login

function testLogin() {
    var data = {
        email:      "testAXios@co.c",
        password:   "testHEre"
    }
    var url = api.post.auth.user.login
    axios.post(url, data, opt).then(
            function(res) {
                console.log(res.data)
            }
        ).catch(
            function(error) {
                console.log(error.response.data)
            }
        )
} 

function getUser() {
    var uuid = '280f48f8-26b5-4c8c-a559-5e4085d9c583'
    var url = api.get.auth.user.uuid
    axios.get(url + uuid, opt).then(
            function(res) {
                console.log(res.data.uuid)
            }
        ).catch(
            function(error) {
                console.log(error.response.data)
            }
        )
} 

function createContainer() {
    const data = {
        owner: '280f48f8-26b5-4c8c-a559-5e4085d9c583',
        name:  'asd',
        body:  'test.axiosasdawco.c'
    };
    const url = api.post.block.container.create;

    axios.post(url, data, opt).then(
            function(res) {
                console.log(res.data)
            }
        ).catch(
            function(error) {
                console.log(error.response.data)
            }
        )
} 

function getContByOwner() {
    var uuid = '280f48f8-26b5-4c8c-a559-5e4085d9c583'
    var url = api.get.block.container.owner;
    axios.get(url + uuid, opt).then(
            function(res) {
                console.log(res.data)
                const data = res.data;
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    console.log(element.body)
                }
            }
        ).catch(
            function(error) {
                console.log(error.response.data)
            }
        )
} 


getContByOwner()
