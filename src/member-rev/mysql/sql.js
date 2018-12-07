/*
 * @Author: 田佳茹 
 * @Date: 2018-12-05 16:27:22 
 * @Last Modified by: 田佳茹
 * @Last Modified time: 2018-12-07 20:28:30
 */

module.exports = {
    "SELECT_ALL": "select * from member order by create_time",
    'SELECT_COUNT': 'select count(*) from member',
    //查询是否存在
    "SELECT_ISHAS": "select * from member where idcard=?",
    //添加成员
    "INSERT_MEMBER": "insert into member(name,address,create_time,idcard,phone) values(?,?,?,?,?)",
    //删除成员
    "DELETE_MEMBER": "delete from member where id=?",
    //查看详情
    "SELECT_DETAIL": "select * from member where id=?",
    //修改信息
    "UPDATE_INFO": "update member set name=?,address=?,create_time=?,idcard=?,phone=? where id=?"

}