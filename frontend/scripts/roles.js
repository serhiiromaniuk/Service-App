const rolesMap = {
    default: 'default',
    manager: 'manager',
    admin: 'admin',
    owner: 'owner'
};

const existRole = 'owner'
const startRole = 'manager';
let arr = [];

for (var key in rolesMap) {
    arr.push(rolesMap[key]);
}

const map = arr.slice(arr.indexOf(startRole)); 

map.includes(existRole)




































































