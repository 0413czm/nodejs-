// 当前文件是怼用户读取操作用户数据方法封装

// 加载json文件
const dbJson = require('../db.json');
const fs = require('fs');
const path = require('path');
// 获取用户数据
exports.getUsers = function() {
        return dbJson.users;
    }
    // 设置分页的方法
    // page:第几页， size： 分页数
exports.getPageUsers = function(page, size) {
    // page: 必须是数字类型，而且值必须大于0，
    if (typeof(page) !== 'number' || page <= 0) {
        return { code: 0, msg: 'page的参数的类型不符合条件' }
    }
    if (typeof(size) !== 'number' || size <= 0) {
        return { code: 0, msg: 'size的参数的类型不符合条件' }
    }

    dbJson
        .users
        .sort((a, b) => b.id - a.id);

    return {
        users: dbJson
            .users
            .slice((page - 1) * size, page * size),
        count: dbJson.users.length,
        code: 1,
        msg: '获取成功！'
    };
}

// 把数据保存到db.json文件中
exports.addUser = function(user) {
        // 先判断数据是否合法
        if (!user.name) {
            return {
                msg: '用户名不能为空',
                code: 0
            }
        }
        // 数据保存
        // user.id // 自动赋值
        const newUser = Object.assign({
            id: Date.now()
        }, user)
        dbJson.users.push(newUser);
        saveJson(dbJson);
        return {
            msg: '保存成功',
            code: 1
        }
    }
    // 把对象转换成json字符串保存到json文件中
function saveJson(json) {
    const strJson = JSON.stringify(json);
    fs.writeFileSync(path.join(__dirname, '../db.json'), strJson, {
        encoding: 'utf8'
    })
}