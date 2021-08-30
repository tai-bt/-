<template>
	<div>
		<el-row :gutter="12">
			<el-col :span="8" v-for="(item,index) in deskList" :key="index" class="hand food-card">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>{{item.deskNum}}</span>
						<el-button style="float: right; padding: 3px 0" type="text" @click="deletePlace(item)">删除</el-button>
					</div>
					<div class="height scrollStyle">
						<p v-for="(itm,ind) in item.selectList" :key="ind" class="text">
							<span>菜名：</span>
							<span class="food-num">{{itm.num}}份</span>
							<span class="food-name">{{itm.foodName}}--{{itm.price}}/份</span>
							<p class="clear"></p>
						</p>
					</div>
					<div style="text-align: right">
						总价：{{item.priceAll}}元
						<el-button type="text" @click="settlement(item)">结算</el-button>
					</div>
				</el-card>

			</el-col>
			<el-col :span="8" class="hand food-card" @click.native='openDrawer'>
				<el-card class="box-card">
					<div style="height:243px">
						<i class="el-icon-plus addIcon"></i>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<div class="homeDialog">
			<el-dialog
				title="添加餐桌"
				:visible.sync="drawer"
				width="30%"
				>

				<el-input v-model="deskNum"></el-input>

				<span slot="footer" class="dialog-footer">
					<el-button @click="drawer = false">取 消</el-button>
					<el-button type="primary" @click="sureOrder">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				deskList: [],
				selectList: [],
				drawer: false,
				deskNum: ''
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
			// 打开新增桌号弹窗
			openDrawer(){
				this.drawer = true
			},
			// 新增桌号
			sureOrder(){
				if (this.deskList.some((item, index) => {return item.deskNum == this.deskNum})) {
					this.$message.warning('已有')
				} else {
					var data = {
						isCheckout: 0,
						selectList: '',
						deskNum: this.deskNum,
						peopleNum: 0
					}
					this.$post(this.utilMap.apis.updataPlace, data).then((res)=>{
						this.$message.success('新增成功')
						this.searchbydesk()
						this.deskNum = ''
						this.drawer = false
					})
				}
			},
			// 删除餐桌
			deletePlace(item){
				var _this = this
				if (item.selectList && item.selectList.length) {
					this.$message.warning('有已点菜品，请先结算再删除餐桌')
					return
				}
				_this.$confirm('确定删除改餐桌？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let data = {
						deskNum: item.deskNum
					}
					_this.$post(_this.utilMap.apis.deletePlace, data).then((res)=>{
						_this.searchbydesk()
					})
				})
			},
			// 结算
			settlement(item){
				if (!(item.selectList && item.selectList.length)) {
					this.$message.warning('还未点餐，不能结算')
					return
				}
				var _this = this,
					data = {
						endTime: this.$options.filters['GMTToStr'](new Date())
					}
					data = {...data, ...item}
					data.selectList = JSON.stringify(data.selectList)
					delete data.isCheckout
				_this.$confirm('确认结算？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(()=>{
					_this.$post(_this.utilMap.apis.addHistory, data).then((res)=>{
						let obj = {
							isCheckout: 0,
							selectList: '',
							deskNum: data.deskNum,
							peopleNum: 0
						}
						this.$post(this.utilMap.apis.updataPlace, obj).then((res)=>{
							this.$message.success('结算成功')
							this.searchbydesk()
						})
					})
				})

			}
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
</style>