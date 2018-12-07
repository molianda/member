/*
 * @Author: 田佳茹 
 * @Date: 2018-12-05 16:27:16 
 * @Last Modified by: 田佳茹
 * @Last Modified time: 2018-12-07 20:18:37
 */

var mysql = require('mysql');
var opt = {
    user: 'root',
    password: 'root',
    host: 'localhost',
    database: 'molianda',
    conectionLimit: 100
}
var pool = mysql.createPool(opt);
module.exports = function(sql, arr, ck) {
    pool.getConnection(function(err, con) {
        if (err) {
            return ck && ck(err);
        }
        con.query(sql, arr, function(err, result) {
            if (err) {
                return ck && ck(err);
            }
            ck && ck(null, result);
            con.release();
        });
    });
};
/* module.exports = function(sql, arr, ck) {
    fn = fn ? fn : query;
    query = query || [];
    pool.getConnection(function(err, con) {
        if (err) {
            ck(err);
        } else {
            con.query(sql, query, function(err, result) {
                con.release();
                queryCallback(err, result);
            })
        }
    });

    function queryCallback(err, result) {
        if (err) {
            ck(err);
        } else {
            fn(null, result);
        }
    }
}; */