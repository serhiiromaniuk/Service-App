const rolesMap = {
    default: 1,
    manager: 2,
    admin: 3,
    owner: 4
};

const existRole = 4;
const allowRole = 2;
let arr = [];

for (var key in rolesMap) {
    arr.push(rolesMap[key]);
}

const map = arr.slice(arr.indexOf(allowRole)); 

console.log(map)
console.log(map.includes(existRole) && 'allow' || 'restrict')