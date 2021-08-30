<template>
    <div>
        <!-- 菜品管理 -->
        <div class="t-mb20">
            <el-button type="primary" class="t-mr60" @click="openVariety">添加菜品</el-button>
            <el-input class="t-mr10" v-model="searchName" style="width:400px" @keyup.enter.native="getvariety"></el-input>
            <el-button type="primary" class="t-mr20" @click="getvariety">搜索</el-button>
        </div>

        <el-row :gutter="12">
            <el-col :span="8" v-for="(item,index) in varietyList" :key="index" class="hand food-card">
                <el-card shadow="hover" class="t-mb20 height scrollStyle">
                    <div slot="header" class="clearfix">
                        <el-button style="float: right; padding: 0" type="text" @click="delectFood(item.id)">删除</el-button>
                        <el-button style="float: right; padding: 0" class="t-mr10" type="text" @click="updataFood(item)">修改</el-button>
                    </div>
                    <p class="text">
                        <span>菜名：</span>
                        <span class="food-name">{{item.foodName}}</span>
                        <p class="clear"></p>
                    </p>
                    <p class="text">
                        <span>编号：</span>
                        <span class="food-name">{{item.foodNum}}</span>
                        <p class="clear"></p>
                    </p>
                    <p class="text">
                        <span>价格：</span>
                        <span class="food-name">{{item.price}}</span>
                        <p class="clear"></p>
                    </p>
                </el-card>
            </el-col>
        </el-row>

        <div class="homeDialog">
            <el-dialog
                title="提示"
                :visible.sync="dialogVariety"
                width="30%"
                destroy-on-close
                :close-on-click-modal='false'
                >

                <el-form :model="varietyMap" status-icon :rules="rules" ref="varietyMap" label-width="60px" class="demo-ruleForm">
                    <el-form-item label="菜名" prop="foodName">
                        <el-input v-model="varietyMap.foodName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="编号" prop="foodNum">
                        <el-input v-model="varietyMap.foodNum" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input v-model.number="varietyMap.price"></el-input>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVariety = false">取 消</el-button>
                    <el-button type="primary" @click="addVariety">确 定</el-button>
                </span>

            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                searchName:'',
                varietyList:[],
                varietyMap:{
                    foodName:'',
                    foodNum:'',
                    price:0
                },
                dialogVariety:false,
                rules:{
                    foodName:[
                        { required: true, message: '请填写菜品名称', trigger: 'change' }
                    ],
                    foodNum:[
                        { required: true, message: '请填写菜品编号', trigger: 'change' }
                    ],
                    price:[
                        { required: true, message: '请填写菜品价格', trigger: 'change' }
                    ],
                }
            }
        },
        watch:{
            dialogVariety(res){
                if(!res){
                    this.varietyMap = {
                        foodName:'',
                        foodNum:'',
                        price:0
                    }
                }
            }
        },
        methods:{
            getvariety(){
                var _this = this
                _this.$post(_this.utilMap.apis.getvariety,{
                    foodName:_this.searchName
                }).then((res)=>{
                    this.varietyList = res.data
                })
            },
            openVariety(){
                this.dialogVariety = true
            },
            // 修改
            updataFood(item){
                this.varietyMap = {...item}
                this.openVariety()
            },
            updataVariety(){
                var _this = this
                _this.$post(_this.utilMap.apis.updataVariety,_this.varietyMap).then((res)=>{
                    this.dialogVariety = false
                    this.getvariety()
                })
            },
            addVariety(){
                var _this = this
                if(!this.rule('varietyMap')){
                    _this.$message.warning('所有均为必填项')
                }else{
                    if(_this.varietyMap.id){
                        _this.updataVariety()
                    }else{
                        _this.$post(_this.utilMap.apis.addVariety,_this.varietyMap).then((res)=>{
                            this.dialogVariety = false
                            this.getvariety()
                        })
                    }
                }
            },
            delectFood(id){
                var _this = this
                this.$confirm('此操作将永久删除该菜品, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.$post(_this.utilMap.apis.delectVariety,{
                        id:parseInt(id)
                    }).then((res)=>{
                        this.getvariety()
                    })
                })
            },
        },
        mounted(){
            this.getvariety()
        }
    }
</script>

<style lang="scss" scoped>
.division{
    width: 100%;
    height: 1px;
    background-color: transparent;
}
</style>