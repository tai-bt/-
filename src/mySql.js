const express = require("express")
const bodyParser = require("body-parser")
const MyNode = express()
MyNode.use(bodyParser.json())

// 链接MYSQL数据库
const mysql = require('mysql');
const { join } = require("core-js/fn/array");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'bb991028.',
    database : 'bing'
});
connection.connect();


// 注册
MyNode.post('/mysql/user/register',(req,res)=>{
    var ojb = {
        code: 200,
        message: "有必填字段未填写",
        data:null
    },
    ojbRepeat = {
        code: 201,
        message: "用户名重复",
        data:null
    }
    if(!req.body.userName || !req.body.userPassword){
        res.json(ojb)
    }else{
        var select = `SELECT * FROM userInfo`
        connection.query(select,(error, results, fields)=>{ // 查询所有用户，拿到用户名，防止用户名冲突
            var userList = []
            results.forEach((item,index)=>{
                userList.push(item.userName)
            })
            var repeatIs = userList.some((item,index)=>{return item == req.body.userName})
            if(repeatIs){
                res.json(ojbRepeat)
            }else{
                register()
            }
        })
        function register(){ // 注册方法
            req.body.userId = new Date().getTime() % 10000
            var keys = Object.keys(req.body)
            var length = []
            keys.forEach((item,index)=>{
                length.push("?")
            })
    
            var  addSql = 'INSERT INTO userInfo('+ keys +') VALUES('+ length.join(',') + ')';
            var  addSqlParams = Object.values(req.body);
            connection.query(addSql,addSqlParams,(error, results, fields)=>{
                if (error) throw error;
                res.json({
                    code:0,
                    message:'注册成功',
                    data : null
                })
            })
        }

    }
})

// 登录
MyNode.post('/mysql/user/login',(req,res)=>{
    var ojb = {
        code: 200,
        message: "有必填字段未填写",
        data:null
    }
    if(!req.body.userName || !req.body.userPassword){
        res.json(ojb)
    }else{
        var select = `SELECT * FROM userInfo WHERE userName = "${req.body.userName}"`
        connection.query(select,(error,results,field)=>{
            if (error) throw error;
            if(results.length > 0){
                var userInfo = results[0]
                if(userInfo.userPassword == req.body.userPassword){
                    res.json({
                        code : 0,
                        message : '登录成功',
                        data : userInfo.userId
                    })
                }else{
                    res.json({
                        code : 201,
                        message : '密码错误',
                        data : null
                    })
                }
            }else{
                res.json({
                    code : 202,
                    message : '用户不存在',
                    data : null
                })
            }
        })
    }
})


// 查询
MyNode.post('/mysql/SqlList',(req,res) => {
    if(req.body.name){
        var select = `SELECT * FROM node WHERE name like "%${req.body.name}%" AND userId = "${req.body.userId}"`
    }else{
        var select = `SELECT * FROM node WHERE userId = "${req.body.userId}"`
    }
    connection.query(select, function (error, results, fields) {
        if (error) throw error;
        // 分页
        var pageSize = req.body.pageSize,
            currentPage = req.body.currentPage,
            data = {
                total : results.length,
                pageSize : pageSize,
                currentPage : currentPage,
                list : results.slice(pageSize*currentPage-pageSize,pageSize*currentPage)
            }
        res.json({
            code: 0,
            message: "请求成功",
            data:data
        })
    });
})

// 添加
MyNode.post('/mysql/addRow',(req,res) => {
    var keys = Object.keys(req.body)
    var length = []
    keys.forEach((item,index)=>{
        length.push("?")
    })
    var  addSql = 'INSERT INTO node('+ keys +') VALUES('+ length.join(',') + ')';
    var  addSqlParams = Object.values(req.body);

    connection.query(addSql,addSqlParams, function (error, results) {
        if (error) throw error;
        res.json({
            code: 0,
            message: "请求成功",
            data:null
        })
    });
})

// 删除
MyNode.post('/mysql/deleteRow',(req,res) => {
    var  addSql = `DELETE FROM node WHERE id=${req.body.id} AND userId = "${req.body.userId}"`;

    connection.query(addSql, function (error, results) {
        if (error) throw error;
        res.json({
            code: 0,
            message: "请求成功",
            data:null
        })
    });
})

// 修改
MyNode.post('/mysql/UpDataRow',(req,res) =>{
    var keys = Object.keys(req.body),
        length = [],
        modSqlParams = []
    keys.forEach((item,index)=>{
        if(item != 'id'){
            length.push(item + '= ?')
            modSqlParams.push(req.body[item])
        }
    })
    // var modSql = 'UPDATE node SET ' + length.join(',') + ' WHERE id = '+req.body.id ;
    var modSql = `UPDATE node SET ${length.join(',')} WHERE id = ${req.body.id} AND userId = "${req.body.userId}"`

    connection.query(modSql,modSqlParams, function (error, results) {
        if (error) throw error;
        res.json({
            code: 0,
            message: "请求成功",
            data:null
        })
    });
})


MyNode.listen(8888)