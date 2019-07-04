const express = require('express');
const userServrse = require('../servse/userServse');
// 创建路由对象
const router = express.Router();

// router对象相当于子app
router.get('/userlist', (req, res) => {
    res.json(userServrse.getUsers());
})
module.exports = router;