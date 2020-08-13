<template>
	<div>
		<el-input style="width:30%" placeholder="模糊查询" v-model.lazy="SheName" @change="MySqlNode"></el-input>
		<el-button class="t-ml20" @click="add">添加</el-button>
		<el-table class="t-mt30" :data="tableData" border>
			<el-table-column prop="name" label="事情名">
			</el-table-column>
			<el-table-column prop="resource" label="干啥">
			</el-table-column>
			<el-table-column prop="date" label="时间">
				<template slot-scope="scope">
					{{scope.row.date | GMTToStr}}
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button type="text" @click="UpdataList(scope.row)">修改</el-button>
					<el-button type="text" @click="deleteList(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
			class="fr t-mt10"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="[10, 20, 30, 40]"
			:page-size="pageSize"
			layout="total, sizes, prev, pager, next, jumper"
			:total="total">
		</el-pagination>
		<div class="clear"></div>
		<div class="homeDialog">
			<el-dialog
				title="提示"
				:visible.sync="dialogVisible"
				width="50%"
				:close-on-click-modal="false"
				>
				<el-form label-position="left" label-width="80px" :model="body">
					<el-form-item label="时间">
						<el-date-picker
							style="width:100%"
							v-model="body.date"
							type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="名称">
						<el-input v-model="body.name"></el-input>
					</el-form-item>
					<el-form-item label="干哈">
						<el-input v-model="body.resource"></el-input>
					</el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addRow">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			tableData:[],
			dialogVisible:false,
			body:{
				name: "",
				resource: "",
				date:""
			},
			SheName:"",
			UpdataIs : false,
			currentPage:1,
			pageSize:10,
			total:0
		}
	},
	watch:{
		dialogVisible(res){
			if(!res){
				this.UpdataIs = false
			}
		},
	},
	computed:{
		userId(){
			return this.$store.state.userId
		}
	},
	methods:{
		getCopy(){
			this.body = {
				name: "",
				resource: "",
				date:""
			}
		},
		handleSizeChange(val){
			this.pageSize = val
			this.MySqlNode()
		},
		handleCurrentChange(val){
			this.currentPage = val
			this.MySqlNode()
		},
		add(){
			this.getCopy()
			this.dialogVisible = true
		},

		// mySql数据库数据
		MySqlNode(){
			this.$http.post('/mysql/SqlList',{
				name:this.SheName,
				userId:this.userId,
				pageSize:this.pageSize,
				currentPage:this.currentPage
			}).then((res)=>{
				this.tableData = res.data.data.list
				this.total = res.data.data.total
			})
		},
		UpdataList(val){
			this.UpdataIs = true
			this.body = val
			this.dialogVisible = true
		},
		addRow(){
			var value = Object.values(this.body)
			if(value.some((item,index)=>{return item == ''})){
				this.$message.warning('所有都是必填字段')
				return
			}
			this.body.userId = this.userId
			if(this.UpdataIs){ // 修改
				this.body.date = this.$options.filters['GMTToStr'](this.body.date)
				this.$http.post('/mysql/UpDataRow',this.body).then((res)=>{
					if(res.data.code == 0){
						this.MySqlNode()
						this.dialogVisible = false
					}
				})
			}else{ // 添加
				this.body.date = this.$options.filters['GMTToStr'](this.body.date)
				this.$http.post('/mysql/addRow',this.body).then((res)=>{
					if(res.data.code == 0){
						this.MySqlNode()
						this.dialogVisible = false
					}
				})
			}
		},
		deleteList(val){
			this.$confirm('真的假的？！这删了就没求了', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				console.log(val.id,this.userId)
				this.$http.post('/mysql/deleteRow',{
					id:val.id,
					userId:this.userId
				}).then((res)=>{
					if(res.data.code == 0){
						this.MySqlNode()
					}
				})
			})
		},
	},
	mounted(){
		// this.login()
		// this.getlist()
		this.MySqlNode()
	}
}
</script>

<style>

</style>