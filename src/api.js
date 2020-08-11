const express = require("express")
const bodyParser = require("body-parser")
const cookieParase = require("cookie-parser");  // 为了记录数据
const app = express()
app.use(cookieParase());

let dataList = [
    {
        id: 1,
        name: "滑雪",
        region: "1",
        date1: "2020-05-08",
        type: ["1", "2"],
        resource: "线下场地免费",
        desc: "集体聚餐"
    },
    {
        id: 2,
        name: "野外聚餐",
        region: "2",
        date1: "2020-05-20",
        type: ["2", "3"],
        resource: "线下场地免费",
        desc: "集体聚餐"
    },
    {
        id: 3,
        name: "团建",
        region: "2",
        date1: "2020-05-20",
        type: ["3", "4"],
        resource: "线下场地免费",
        desc: "集体聚餐"
    },
]
app.use(bodyParser.json())
//登录
app.post("/api/login", (req, res) => {
    setTimeout(() => {
        res.json({
            username: req.body.username
        })
    }, 1000)
})


//列表查询
app.get("/api/getlist", (req, res) => {
    let cookieData = req.cookies.dataList
    if (!cookieData) {
        res.cookie("dataList", JSON.stringify(dataList))
    }
    let data = cookieData ? JSON.parse(cookieData) : dataList
    if (req.query.name) {
        data = data.filter(el => el.name == req.query.name)
    }
    let pageData =  JSON.parse(JSON.stringify(data)).splice((req.query.currentPage - 1 ) * req.query.pageSize ,req.query.pageSize)
    setTimeout(() => {
        res.json(
            {
                code: 0,
                message: "成功",
                data:{
                    list:pageData,
                    total:data.length,
                    currentPage:Number(req.query.currentPage),
                    pageSize:Number(req.query.pageSize),
                }
            }
        )
    }, 1000)
})

//新增/编辑
app.post("/api/addOrupdata", (req, res) => {
    let cookieData = req.cookies.dataList
    if (!cookieData) {
        res.cookie("dataList", JSON.stringify(dataList))
    }
    let data = cookieData ? JSON.parse(cookieData) : dataList
    let newData = req.body
    if (Object.keys(req.body).length == 0) {
        res.json({
            code: 1,
            message: "没有接收到参数"
        })
    }
    if (req.body.id) {
        for (let i = 0; i < data.length; i++) {
            if (newData.id == data[i].id) {
                data[i] = newData;
                break;
            }
        }
    } else {
        newData.id = new Date().getTime()
        data.push(req.body)
    }
    res.cookie("dataList", JSON.stringify(data))
    setTimeout(() => {
        res.json({
            code: 0,
            message: "成功"
        })
    })
})

//删除
app.delete("/api/delete", (req, res) => {
    console.log(req.body)
    let newData = req.body
    let cookieData = req.cookies.dataList
    let data = cookieData ? JSON.parse(cookieData) : dataList
    
    if (newData.length>0) {
        for(let i = 0;i <newData.length;i++){
            for(let j = 0;j<data.length;j++){
                if(newData[i] == data[j].id){
                    data.splice(j,1)
                }
            }
        }
        res.cookie("dataList", JSON.stringify(data))
        res.json({
            code: 0,
            message: "成功"
        })
    } else {
        res.json({
            code: 1,
            message: "没有参数"
        })
    }

})

//根据id查询
app.get("/api/byId",(req,res)=>{
    let newData = req.query
    let cookieData = req.cookies.dataList
    let data = cookieData ? JSON.parse(cookieData) : dataList
    if (newData.id) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].id == newData.id) {
                res.json({
                    code:0,
                    data:data[i]
                })
                break;
            }
        }
    } else {
        res.json({
            code: 1,
            message: "没有ID"
        })
    }
})

//查询下拉框选项
app.get("/api/getSelectData",(req,res)=>{
    res.json({
        code:0,
        message:"成功",
        list:[
            {
                value:"1",
                label:"北京"
            },
            {
                value:"2",
                label:"上海"
            }
        ]
    })
})

//获取活动性质接口
app.get("/api/getType",(req,res)=>{
    res.json({
        code:0,
        message:"成功",
        list:[
            {
                label:"美食/餐厅线上活动",
                value:1
            },
            {
                label:"地推活动",
                value:2
            },
            {
                label:"线下主题活动",
                value:3
            },
            {
                label:"单纯品牌曝光",
                value:4
            }
        ]
    })
})

app.listen(3000)