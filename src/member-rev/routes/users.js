/*
 * @Author: 田佳茹 
 * @Date: 2018-12-05 16:27:05 
 * @Last Modified by: 田佳茹
 * @Last Modified time: 2018-12-07 20:27:55
 */

var express = require('express');
var router = express.Router();
var query = require('../mysql');
var sql = require('../mysql/sql');
/* GET users listing. */
router.get('/', function(req, res, next) {
    var pagenum = req.query.pagenum;
    var pagesize = req.query.pagesize;

    query(sql.SELECT_COUNT, function(err, result) {
        if (err) {
            res.json({ code: 0, msg: err });
        } else {
            console.log(pagenum, pagesize);
            var total = Math.ceil(result[0]['count(*)'] / pagesize);
            queryUserlist(total);
        }
    });

    function queryUserlist(total) {
        var start = (pagenum - 1) * pagesize;
        console.log(pagenum, pagesize);
        var sqlstr = `select * from member order by create_time limit ${start},${pagesize}`;
        query(sqlstr, function(err, result) {
            if (err) {
                return res.json({ code: 0, msg: err });
            } else {
                res.json({ code: 1, data: result, total: total });
            }
        });
    }
});
//添加成员
router.post('/api/add', function(req, res, next) {
    var params = req.body;
    var name = params.name;
    var address = params.address;
    var idcard = params.idcard;
    var phone = params.phone;
    query(sql.SELECT_ISHAS, [idcard], function(err, result) {
        if (err) {
            res.json({ code: 0, msg: err });
        } else {
            if (result.length > 0) {
                res.json({ code: 2, msg: '该用户已存在' });
            } else {
                query(sql.INSERT_MEMBER, [name, address, new Date().toLocaleString(), idcard, phone], function(err, result) {
                    if (err) {
                        res.json({ code: 0, msg: err });
                    } else {
                        res.json({ code: 1, msg: '添加成功' })
                    }
                })
            }
        }
    });
});
//删除成员
router.get('/api/delete', function(req, res, next) {
    var id = req.query.id;
    if (id) {
        query(sql.DELETE_MEMBER, [id], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err });
            } else {
                res.json({ code: 1, msg: '删除成功' });
            }
        })
    } else {
        res.json({ code: 2, msg: '缺少参数' });
    }
});
//查看详情
router.get('/api/detail', function(req, res, next) {
    var id = req.query.id;
    if (id) {
        query(sql.SELECT_DETAIL, [id], function(err, result) {
            if (err) {
                res.json({ code: 0, msg: err });
            } else {
                res.json({ code: 1, msg: '查看成功', data: result });
            }
        })
    } else {
        res.json({ code: 2, msg: '缺少参数' });
    }
});
//修改信息
router.post('/api/update', function(req, res, next) {
    var params = req.body;
    var name = params.name;
    var address = params.address;
    var idcard = params.idcard;
    var phone = params.phone;
    var id = params.id;
    if (id) {
        if (!name || !idcard) {
            res.json({ code: 2, msg: '姓名和身份证号不能为空' });
        } else {
            query(sql.UPDATE_INFO, [name, address, new Date().toLocaleString(), idcard, phone, id], function(err, result) {
                if (err) {
                    res.json({ code: 0, msg: err });
                } else {
                    res.json({ code: 1, msg: '修改成功' });
                }
            });
        }
    } else {
        res.json({ code: 2, msg: '缺少参数' });
    }
})
module.exports = router;