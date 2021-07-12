<template>
	<div>
		<p class="t-mb10">
			<span v-if="deskMap.deskNum" class="t-mr20">{{deskMap.deskNum}}号桌 </span>
			
			<span class="hand" @click="initDesk">重新选择桌号</span>
		</p>
		<!-- 点餐管理 -->
		<el-row :gutter="12">
			<el-col :span="8" v-for="(item,index) in varietyList" :key="index" class="hand food-card">
				<el-card shadow="hover" class="t-mb20 height scrollStyle">
					<p class="text">
						<span>菜名：</span>
						<span class="food-name">{{item.foodName}}</span>
						<p class="clear"></p>
					</p>
					<p class="text">
						<span>价格：</span>
						<span class="food-name">{{item.price}}</span>
						<p class="clear"></p>
					</p>
					<p class="button t-mt15">
						<span @click="addFood(item)">添加</span>
					</p>
				</el-card>
			</el-col>
		</el-row>

		<el-badge :value="selectNum" class="item hand" @click.native="drawer = true">
			<i class="el-icon-goods"></i>
		</el-badge>

		<el-drawer
			class="food-card"
			:title="deskMap.deskNum?(deskMap.deskNum + '号桌已点菜品'):'请先填写桌号'"
			:visible.sync="drawer"
			direction="rtl">
			<div class="scrollStyle" style="height:calc(100vh - 120px);overflow: auto;">
				<el-card v-for="(item,index) in selectList" :key="index" shadow="hover" class="t-mb20">
					<p class="text hand delete">
						<i class="el-icon-delete-solid" @click="deleteFood(index)"></i>
					</p>
					<div class="text">
						<span>菜名：</span>
						<span class="food-name">{{item.foodName}}</span>
						<p class="clear"></p>
					</div>
					<div class="text">
						<span>单价：</span>
						<span class="food-name">{{item.price}}</span>
						<p class="clear"></p>
					</div>
					<div class="text">
						<span>总价：</span>
						<el-input-number v-model="item.num" :min="1" :step="1" :precision="0" size="mini"></el-input-number>
						<span class="t-ml20">{{item.price*item.num}}元</span>
						<p class="clear"></p>
					</div>
				</el-card>
			</div>
			<el-button class="fr t-mr20" type="primary" size="small" round @click="sureOrder">确认下单</el-button>
		</el-drawer>

		<div class="homeDialog">
			<el-dialog
				title="提示"
				:visible.sync="placeDialog"
				:close-on-click-modal="false"
				:close-on-press-escape="false"
				:show-close="false"
				width="30%">
				<el-form label-position="left" :model="deskMap" status-icon :rules="rules" ref="deskMap" label-width="70px" class="demo-ruleForm">
					<el-form-item label="桌号" prop="deskNum">
						<el-select v-model="deskMap.deskNum" placeholder="请选择" style="width:100%">
							<el-option
								v-for="item in deskList"
								:key="item.deskNum"
								:label="item.deskNum"
								:value="item.deskNum">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="人数" prop="peopleNum">
						<el-input v-model.number="deskMap.peopleNum" autocomplete="off"></el-input>
					</el-form-item>
				</el-form>

				<span slot="footer" class="dialog-footer">
					<el-button type="primary" @click="sureDesk">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				varietyList : [],
				selectList : [],
				drawer : false,
				deskMap:{
					deskNum:'',
					peopleNum:''
				},
				rules:{
					deskNum: [
						{ required: true, message: '请选择桌号', trigger: 'blur' },
					],
					peopleNum: [
						{ required: true, message: '请输入人数', trigger: 'blur' },
					],
				},
				placeDialog:false,
				deskList:[]
			}
		},
		computed:{
			selectNum(){
				let num = 0
				this.selectList.forEach((item,index)=>{
					num += item.num
				})
				return num
			}
		},
		watch:{
			'deskMap.deskNum'(res){
				let peopleNum = this.deskList.filter((item,index) => {
					return item.deskNum == res
				})[0].peopleNum
				this.deskMap.peopleNum = peopleNum
			}
		},
		methods:{
			initDesk(){
				this.placeDialog = true
			},
			sureDesk(){
				this.$refs.deskMap.validate((valid) => {
					if(valid){
						let list = this.deskList.filter((item,index)=>{
							return item.deskNum == this.deskMap.deskNum
						})[0].selectList
						this.selectList =  list
		
						this.placeDialog = false
					}
				})
			},
			// 获取菜单
			getvariety(){
				var _this = this
				_this.$post(_this.utilMap.apis.getvariety,{
					foodName:_this.searchName
				}).then((res)=>{
					this.varietyList = res.data
				})
			},
			// 添加购物车
			addFood(item){
				let SelIndex = this.selectList.findIndex((itm,index)=>{
					return itm.foodNum == item.foodNum
				})
				if(SelIndex != -1){
					this.selectList[SelIndex].num++
				}else{
					this.$set(item,'num',1)
					this.selectList.push(item)
				}
			},
			// 删除购物车
			deleteFood(index){
				this.$confirm('确定删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(()=>{
					this.selectList.splice(index,1)
				})
			},
			// 下单
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
			// 获取桌号信息
			searchbydesk(){
				var _this = this
				_this.$get(`${_this.utilMap.apis.searchbydesk}`).then((res)=>{
					res.data.forEach((item,index) => {
						item.selectList = item.selectList ? JSON.parse(item.selectList) : []
					})
					this.deskList = res.data
				})
			},
		},
		mounted(){
			this.searchbydesk()
			this.getvariety()
			this.initDesk()
		}
	}
</script>

<style lang="scss" scoped>
.food-card{
	.height{
		height: 120px;
		overflow: auto;
	}
	.text{
		line-height: 25px;
		font-size: 14px;
		.food-name{
			float: right;
			width: calc(100% - 50px);
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
.item{
	position: fixed;
	bottom: 6%;
	right: 4%;
	border: 1px solid #000;
	padding: 8px;
	font-size: 17px;
	border-radius: 50%;
}
</style>