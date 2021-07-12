<template>
	<div>
		<el-row :gutter="12">
			<el-col :span="8" v-for="(item,index) in deskList" :key="index" class="hand food-card">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>{{item.deskNum}}</span>
						<!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
					</div>
					<div class="height scrollStyle">
						<p v-for="(itm,ind) in item.selectList" :key="ind" class="text">
							<span>菜名：</span>
							<span class="food-num">{{itm.num}}份</span>
							<span class="food-name">{{itm.foodName}}</span>
							<p class="clear"></p>
						</p>
					</div>
					<div style="text-align: right">
						总价：{{item.priceAll}}元
						<el-button type="text">结算</el-button>
					</div>
				</el-card>

			</el-col>
			<el-col :span="8" class="hand food-card">
				<el-card class="box-card">
					<div style="height:285px">
						<i class="el-icon-plus addIcon"></i>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				deskList:[],
				selectList:[]
			}
		},
		methods:{
			// 获取菜单
			getvariety(){
				var _this = this
				_this.$post(_this.utilMap.apis.getvariety,{
					foodName:_this.searchName
				}).then((res)=>{
					this.varietyList = res.data
				})
			},
			// 根据桌号查询已下单菜品
			searchbydesk(){
				var _this = this
				_this.$get(`${_this.utilMap.apis.searchbydesk}`).then((res)=>{
					res.data.forEach((item,index) => {
						item.selectList = item.selectList ? JSON.parse(item.selectList) : []
						item.priceAll = this.setPrice(item.selectList)
					})
					this.deskList = res.data
				})
			},
			setPrice(list){
				let price = 0
				list.forEach((item,index) => {
					price += item.num * item.price
				})
				return price
			},
			// 处理查询的菜单
			setSelect(list){
				let selectList = JSON.parse(list)
				for(var i=0; i<this.varietyList.length; i++){
					for(var j=0; j<selectList.length; j++){
						if(this.varietyList[i].foodNum == selectList[j].foodNum){
							selectList[j] = {...selectList[j],...this.varietyList[i]}
							break;
						}
					}
				}
				this.selectList = selectList
			},
			// 新增桌号
			sureOrder(){
				var data = {
					isCheckout: 0,
					selectList: []
				}
				let selectList = []
				this.selectList.forEach((item,index) => {
					selectList.push(item)
				})
				data.selectList = JSON.stringify(selectList)
				data = {...data,...this.deskMap}
				this.$post(this.utilMap.apis.updataPlace,data).then((res)=>{
					this.$message.success('下单成功')
					this.drawer = false
				})
			},
		},
		mounted(){
			this.searchbydesk()
			this.getvariety()
		}
	}
</script>

<style lang="scss" scoped>
.el-col{
	margin-bottom: 15px;
}
.addIcon{
	font-size: 80px;
    position: relative;
    top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: #999;
}
.food-card{
	.height{
		height: 150px;
		overflow: auto;
	}
	.text{
		line-height: 25px;
		font-size: 14px;
		.food-name{
			float: right;
			width: calc(100% - 100px);
		}
		.food-num{
			float: right;
			width: 50px;
		}
	}
	.button{
		text-align: right;
		font-size: 14px;
	}
	.delete{
		text-align:right;
		font-size:16px
	}
}
</style>