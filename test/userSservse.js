// 单元测试 BDD
const userServrse = require('../servse/userServse.js');
const assert = require('assert');
// 一个单元测试 : 定义一个场景，场景初始化数据，开始调用测试单元代码然后检查测执行的结果，如果单元测试结果通过通过则成功

// 定义一个测试场景, 第一个参数是场景的描述，第二个参数是测试场景的回调
describe('userServise的服务测试', function() {
    it('#getUsers()', function() {
        // 执行这个方法返回一个数组
        var arr = userServrse.getUsers();
        // 预期
        assert.equal(true, Array.isArray(arr));
    })
    it('#getPageUsers', function() {
        console.log('3333');

    })
})