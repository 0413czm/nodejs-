// 初始化数据文件

const fs = require('fs');

const path = require('path');

const jsonDB = require('./db.json');

// 引入mockjs
const Mock = require('mockjs');

// 初始化users属性
jsonDB.users || (jsonDB.users = []);

//#region 之前for循环模拟数据
// for (var i = 0; i < 30; i++) {
//     jsonDB.users.push({
//         id: 10000 + i,
//         name: '材质ing' + i,
//         number: '1897774124' + i,
//         email: '2567384324@11.com'
//     })
// }
//#endregion

// 把数据写入到db.json
// 参考：http://mockjs.com/
let data = Mock.mock({
    "users|133": [{
        "id|+1": 20000,
        "name": "@cname",
        "email": "@email",
        "number": "@natural(132000000,133000000)",
        "address": "@county(true)",
        "zip": "@zip",
        "birthday": "@date('yyyy-MM-dd')"
    }]
});

// es6中的展开运算符。展开字符串、对象、数组！
jsonDB.users.push(...data.users);
// jsonDB.users = data.users;
// 把数据写入到db.json中
fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(jsonDB), {
    encoding: 'utf8'
})
console.log("写入数据成功");