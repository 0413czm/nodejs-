const express = require('express');
const path = require('path');
const app = express();

// 用一下两个中间键之前先安装
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const art_express = require('express-art-template');
const userServse = require('./servse/userServse'); // 引入服务

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded // 解析参数 params
// app.use(multer());
let upload = multer();
// upload.array(),
// 设置模版引擎
app.engine('art', art_express);
// 静态请求
app.use(express.static(path.join(__dirname, 'public')));

// 动态请求
app.get('/user/list', (req, res) => {
        // res.render('users/userlist2.art', {
        //     title: '你好呀!',
        //     users: userServse.getUsers()
        // })

        // 实现分页获取数据
        const page = parseInt(req.query.page) || 1;
        const size = parseInt(req.query.size) || 10;
        const data = userServse.getPageUsers(page, size);
        data.page = req.query.page;
        res.render('users/userlist2.art', data);
    })
    // 添加用户
app.get('/user/add', (req, res) => {
    res.render('users/add.art');
})

app.post('/user/add', upload.array(), (req, res) => {
        userServse.addUser(req.body);
        res.redirect('/user/list');
    })
    // 删除用户
app.get('/user/del', (req, res) => {
    userServse.delUser(parseInt(req.query.id));
    res.redirect('/user/list');
})

// 修改用户
app.get('/user/edit', (req, res) => {
        const user = userServse.getUserId(parseInt(req.query.id));
        if (user == null) {
            res.redirect('/user/list');
        }
        res.render('users/edit.art', user);
    })
    // 修改完提交表单
app.post('/user/edit', (req, res) => {
    let user = Object.assign({}, req.body, { id: parseInt(req.body.id) });
    const data = userServse.editUser(user);
    if (data.code === 1) {
        res.redirect('/user/list');
        return;
    } else {
        res.render('users/edit.art', req.body);
    }
})
app.listen(59999, () => {
    console.log('visist http://localhost:59999/');
})