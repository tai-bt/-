<template>
	<div>
		<el-button class="t-mb10" type="primary" size="small" @click="addParent()">添加父级菜单</el-button>
		<el-table
			:data="list"
			style="width: 100%"
			row-key="id"
			border
			:tree-props="{children: 'children', hasChildren: 'hasChildren'}">

			<el-table-column prop="name" label="菜单名"></el-table-column>
			<el-table-column prop="routerLink" label="链接"></el-table-column>
			<el-table-column prop="address" label="操作">
				<template slot-scope="scoped">
					<el-button type="text" @click="addParent(scoped.row)">添加</el-button>
					<el-button type="text" @click="updataMenu(scoped.row)">修改</el-button>
					<el-button type="text" @click="delectMenu(scoped.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<div class="homeDialog">
			<el-dialog
				title="添加菜单"
				:visible.sync="AddDialog"
				width="50%">

				<el-form label-position="left" label-width="80px" :model="partantMenu">
					<el-form-item label="菜单名">
						<el-input v-model="partantMenu.name"></el-input>
					</el-form-item>
					<el-form-item label="链接">
						<el-input v-model="partantMenu.routerLink"></el-input>
					</el-form-item>
					<el-form-item label="权限">
						<el-checkbox-group v-model="partantMenu.roleId">
							<el-checkbox v-for="(item,index) in roleList" :key="index" :label="item.roleId+''">{{item.name}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-form>

				<span slot="footer" class="dialog-footer">
					<el-button @click="AddDialog = false">取 消</el-button>
					<el-button type="primary" @click="addParentMenu">确 定</el-button>
				</span>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data(){
		return{
			partantMenu:{
				userId:sessionStorage.getItem('userId'),
				id:'',
				name:'',
				parentId:0,
				routerLink:'',
				roleId:[]
			},
			AddDialog:false,
			list:[],
			UpdataIs:false,
			roleList:[]
		}
	},
	computed:{
		...mapGetters({
			menuList: 'common/menuList'
		}),
		roleId(){
			return this.$store.state.roleId
		},
	},
	watch:{
		menuList(res){
			this.list = res
		}
	},
	methods:{
		clearOjb(){
			this.partantMenu = {
				userId:sessionStorage.getItem('userId'),
				id : '',
				name : '',
				parentId : 0,
				routerLink : '',
				roleId:[]
			}
			this.UpdataIs = false
		},

		// 获取用户权限下拉框
		getRole(){
			this.$get('/mysql/roleSelect').then((res)=>{
				this.roleList = res.data
			})
		},
		getMenuList(){
			this.$post('/mysql/menuList',{
				roleId:this.roleId
			}).then((res)=>{
				this.$store.commit('common/SET_COLLAPSE',this.forList(res.data))
			})
		},
		// 处理数据，整成树形
		forList(val){
			var list = JSON.parse(JSON.stringify(val))
			for(var i=list.length-1; i>=0; i--){
				for(var j=i-1; j>=0; j--){
					if(list[i] && list[j]){
						if(list[i].parentId == list[j].id){
							var str = list[j].children && list[j].children.length>0?list[j].children:[]
							str.push(list[i])
							list[j].children = str
							list.splice(i,1)
						}
					}
				}
			}
			return list
		},
		// 添加菜单
		addParent(val){
			this.clearOjb()

			if(val){
				this.partantMenu.parentId = val.id
			}else{
				this.partantMenu.parentId = 0
			}
			this.AddDialog = true
		},
		addParentMenu(){
			if (this.partantMenu.roleId.length == 0) {
				this.$message.error('最少选择一个权限')
				return
			}
			this.partantMenu.roleId = this.partantMenu.roleId.join(',')
			if(this.UpdataIs){
				var data = {
					userId:sessionStorage.getItem('userId'),
					id : this.partantMenu.id,
					name : this.partantMenu.name,
					parentId : this.partantMenu.parentId,
					routerLink : this.partantMenu.routerLink,
					roleId : this.partantMenu.roleId
				}
				this.$post('/mysql/updataMenu',data).then((res)=>{
					this.AddDialog = false
					this.getMenuList()
				})
			}else{
				this.partantMenu.id = new Date().getTime()
	
				this.$post('/mysql/addParentMenu',this.partantMenu).then((res)=>{
					this.AddDialog = false
					this.getMenuList()
				})
			}
		},

		/**
		 * 删除
		 * 当前菜单如果有子菜单无法进行删除
		 */
		delectMenu(val){
			if(val.children && val.children.length>0){
				this.$message.warning('由于当前准备删除的菜单有子菜单，所以无法删除')
			}else{
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$post('/mysql/delectMenu',{
						id : val.id
					}).then((res)=>{
						this.$message.success('删除成功')
						this.getMenuList()
					})
				})
			}
		},
		/**修改 */
		updataMenu(val){
			this.partantMenu = JSON.parse(JSON.stringify(val))
			this.partantMenu.roleId = this.partantMenu.roleId.split(',')
			this.AddDialog = true
			this.UpdataIs = true
		}
	},
	mounted(){
		this.getRole()
		this.getMenuList()
	}
}
</script>

<style>

</style>