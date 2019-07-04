const express = require('express');

// 创建路由对象
const router = express.Router();

// router对象相当于子app
router.get('/list', (req, res) => {
    res.render('stu/index.art');
})
module.exports = router;