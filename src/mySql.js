const express = require("express")
const bodyParser = require("body-parser")
const MyNode = express()

/**
 * 解决跨域
 */
MyNode.all("/*",(req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");  // 允许所有路径跨域
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next()
})

MyNode.use(bodyParser.json())

// 链接MYSQL数据库
const mysql = require('mysql');
const { join } = require("core-js/fn/array");
const { findKey } = require("core-js/fn/dict");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'bb991028.',
    database : 'bing'
});
connection.connect();

// 查询用户权限下拉框
MyNode.get('/mysql/roleSelect',(req,res)=>{
    var select = `SELECT * from role`
    connection.query(select,(error,results,fields)=>{
        res.json({
            code : 0,
            message : '查询成功',
            data:results
        })
    })
})

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
                        data : {
                            userId : userInfo.userId,
                            roleId : userInfo.roleId
                        }
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

// 查询左侧导航栏
MyNode.post('/mysql/menuList',(req,res) => {
    var select = `SELECT * from menuList where roleId like "%${req.body.roleId}%"`
    connection.query(select,(error, results, fields)=>{
        if (error) throw error;
        res.json({
            code: 0,
            message: "请求成功",
            data:results
        })
    })
})

// 添加父级&&子集菜单
MyNode.post('/mysql/addParentMenu',(req,res)=>{
    var repeatError = {
        code: 1,
        message: "菜单名称存在重复，请重新输入",
        data:null
    }
    var select = `SELECT * from menuList`
    connection.query(select,(error, results, fields)=>{
        if (error) throw error;
        var str = results.some((item,index) => {
            return item.name == req.body.name
        })
        if(str){
            res.json(repeatError)
        }else{
            add()
        }
    })
    function add(){
        var keys = Object.keys(req.body)
        var length = []
        keys.forEach((item,index)=>{
            length.push("?")
        })
        var  addSql = 'INSERT INTO menuList('+ keys +') VALUES('+ length.join(',') + ')';
        var  addSqlParams = Object.values(req.body);
        connection.query(addSql,addSqlParams,(error, results, fields)=>{
            if (error) throw error;
            res.json({
                code: 0,
                message: "成功添加父级菜单",
                data:null
            })
        })
    }
})

/**
 * 菜单删除
 * 当前菜单如果有子菜单无法进行删除
 * 这个逻辑在前端做了
 */
MyNode.post('/mysql/delectMenu',(req,res)=>{
    var delectSql = `DELETE FROM menuList WHERE id = "${req.body.id}"`
    connection.query(delectSql,(error,results,fields)=>{
        if (error) throw error;
        res.json({
            code: 0,
            message: "删除成功",
            data:results
        })
    })
})

/**
 * 修改菜单
 */
MyNode.post('/mysql/updataMenu',(req,res)=>{
    var repeatError = {
        code: 1,
        message: "菜单名称存在重复，请重新输入",
        data:null
    }
    var select = `SELECT * from menuList`
    connection.query(select,(error, results, fields)=>{
        if (error) throw error;
        var str = results.filter((item,index) => {
            return item.name == req.body.name 
        })
        if(str.length>0){
            if(str[0].id == req.body.id){
                updata()
            }else{
                res.json(repeatError)
            }
        }else{
            updata()
        }
    })
    /**
     * 修改
     */
    function updata(){
        var keys = Object.keys(req.body),
            length = [],
            modSqlParams = []
        keys.forEach((item,index)=>{
            if(item != 'id'){
                length.push(item + '= ?')
                modSqlParams.push(req.body[item])
            }
        })
        var upDataSql = `UPDATE menuList SET ${length.join(',')} WHERE id = "${req.body.id}"`
        connection.query(upDataSql,modSqlParams,(error, results, fields)=>{
            if (error) throw error;

            res.json({
                code : 0,
                message:'修改成功',
                data:null
            })
        })
    }
})

/**
 * 查询菜品
 */
MyNode.post('/mysql/variety',(req,res)=>{
    if(req.body.foodName){
        var select = `SELECT * FROM variety WHERE foodName like "%${req.body.foodName}%"`
    }else{
        var select = `SELECT * from variety`;
    }
    connection.query(select,(error,results,fields)=>{
        res.json({
            code : 0,
            message : '查询成功',
            data:results
        })
    })
})
/**
 * 添加菜品
 */
MyNode.post('/mysql/add-variety',(req,res)=>{
    var repeatError = {
        code: 1,
        message: "菜品名称重复或菜品编号重复，请重新输入",
        data:null
    }
    var  select = `SELECT * from variety`;
    connection.query(select,(error,results,fields)=>{
        let list = results.filter((item,index)=>{
            return item.foodName == req.body.foodName || item.foodNum == req.body.foodNum
        })
        if(list.length > 0){
            res.json(repeatError)
        }else{
            addvariety()
        }
    })
    
    function addvariety(){
        let keys = Object.keys(req.body),
            length = []
        keys.forEach((item,index)=>{
            length.push("?")
        })

        var  addSql = 'INSERT INTO variety('+ keys +') VALUES('+ length.join(',') + ')';
        var  addSqlParams = Object.values(req.body);

        connection.query(addSql,addSqlParams,(error,results,fields)=>{
            res.json({
                code: 0,
                message: "添加成功",
                data:results
            })
        })
    }
})
/**
 * 删除菜品
 */
MyNode.post('/mysql/delect-variety',(req,res)=>{
    var  delectSql = `DELETE FROM variety WHERE id=${req.body.id}`;

    connection.query(delectSql, function (error, results) {
        if (error) throw error;
        res.json({
            code: 0,
            message: "请求成功",
            data:null
        })
    });
})

/**
 * 修改菜品
 */
MyNode.post('/mysql/updata-variety',(req,res)=>{
    var  select = `SELECT * from variety`;
    var repeatError = {
        code: 1,
        message: "菜单名称存在重复，请重新输入",
        data:null
    };
    connection.query(select,(error,results,fields)=>{
        var str = results.filter((item,index) => {
            return item.foodName == req.body.foodName 
        })
        if(str.length>0){
            if(str[0].id == req.body.id){
                updata()
            }else{
                res.json(repeatError)
            }
        }else{
            updata()
        }
    })

    function updata(){
        var keys = Object.keys(req.body),
            length = [],
            modSqlParams = []
        keys.forEach((item,index)=>{
            if(item != 'id'){
                length.push(item + '= ?')
                modSqlParams.push(req.body[item])
            }
        })
        var upDataSql = `UPDATE variety SET ${length.join(',')} WHERE id = "${req.body.id}"`
        connection.query(upDataSql,modSqlParams,(error, results, fields)=>{
            if (error) throw error;
            res.json({
                code : 0,
                message:'修改成功',
                data:null
            })
        })
    }
})
/**
 * 下单
 */
MyNode.post('/mysql/updata-place',(req,res)=>{
    var select = `SELECT * FROM placelist WHERE deskNum = "${req.body.deskNum}"`
    connection.query(select,(error,results,fields)=>{
        var list = results.filter((item,index) => {
            return item.deskNum == req.body.deskNum 
        })
        if(list.length > 0){
            updata()
        }else{
            addplace()
        }
    })

    function addplace(){
        let keys = Object.keys(req.body),
            length = []
        keys.forEach((item,index)=>{
            length.push("?")
        })

        var  addSql = 'INSERT INTO placelist('+ keys +') VALUES('+ length.join(',') + ')';
        var  addSqlParams = Object.values(req.body);

        connection.query(addSql,addSqlParams,(error,results,fields)=>{
            res.json({
                code: 0,
                message: "添加成功",
                data:results
            })
        })
    }

    function updata(){
        var keys = Object.keys(req.body),
            length = [],
            modSqlParams = []
        keys.forEach((item,index)=>{
            if(item != 'deskNum'){
                length.push(item + '= ?')
                modSqlParams.push(req.body[item])
            }
        })
        var upDataSql = `UPDATE placelist SET ${length.join(',')} WHERE deskNum = "${req.body.deskNum}"`
        connection.query(upDataSql,modSqlParams,(error, results, fields)=>{
            if (error) throw error;
            res.json({
                code : 0,
                message:'下单成功',
                data:null
            })
        })
    }
})
/**
 * 根据桌号查询
 */
MyNode.get('/mysql/searchbydesk',(req,res)=>{
    if(req.query.deskNum){
        var select = `SELECT * FROM placelist WHERE deskNum = "${req.query.deskNum}"`
    }else{
        var select = `SELECT * FROM placelist`
    }
    connection.query(select,(error,results,fields)=>{
        res.json({
            code : 0,
            message : '查询成功',
            data:results
        })
    })
})

MyNode.listen(8888)