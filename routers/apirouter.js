const express = require('express');
const userServrse = require('../servse/userServse');
// 创建路由对象
const router = express.Router();

// router对象相当于子app
router.get('/userlist', (req, res) => {
        res.json(userServrse.getUsers());
    })
    // 获取分页数据
router.get('/pageUser', (req, res) => {
    let pageIndex = parseInt(req.query.page);
    pageIndex = (isNaN(pageIndex) || pageIndex <= 0 ? 1 : pageIndex);
    let pageSize = parseInt(req.query.size);
    pageSize = (isNaN(pageSize) || pageSize <= 0 ? 10 : pageSize);
    const data = userServrse.getPageUsers(pageIndex, pageSize);
    res.json({
        page: pageIndex,
        size: pageSize,
        data: data.users,
        count: data.count
    })
})
module.exports = router;