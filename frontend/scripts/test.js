const axios = require('axios')
const api_url = process.env.BACKEND_URL || 'http://localhost:8000/api/v1/'
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
}
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
    var uuid = '682c9b76-42f6-4ada-84c3-9381ee603'
    var url = api.get.auth.user.uuid
    axios.get(url + uuid, opt).then(
            function(res) {
                console.log(res.data)
            }
        ).catch(
            function(error) {
                console.log(error.response.data)
            }
        )
} 

getUser()

