<template>
	<div>
		<el-container>
			<el-header>
				<el-button size="small" @click="LogOut" class="fr t-mr20 t-mt15">退出登录</el-button>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu
						style="height:100%;width:100%;border:none"
						:default-active="$route.path"
						class="el-menu-vertical-demo"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b"
						router
						:unique-opened='true'
					>
						<!-- 递归导航组件组件 -->
						<MenuLeft :menuList='list'></MenuLeft>
					</el-menu>
				</el-aside>
				<el-main>
					<div class="widthCenter">
						<router-view/>
					</div>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import MenuLeft from './menus/menu.vue'
import { mapGetters } from 'vuex'
export default {
	components:{MenuLeft},
	data(){
		return{
			list:[],
		}
	},
	computed:{
		...mapGetters(['menuList']),
		roleId(){
			return this.$store.state.roleId
		}
	},
	watch:{
		menuList(res){
			this.list = res
		}
	},
	methods:{
		getMenuList(){
			this.$http.post('/mysql/menuList',{
				roleId:this.roleId
			}).then((res)=>{
				if(res.data.code == 0){
					this.$store.commit('SET_COLLAPSE',this.forList(res.data.data))
				}
			})
		},
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
		LogOut(){
			this.$router.push({path:'/login'})
		}
	},
	mounted(){
		this.getMenuList()
		
	}
}
</script>

<style scoped lang='scss'>
.el-header{
    background-color: rgba(203, 209, 218,0.5);
    color: #333;
    text-align: center;
	line-height: 60px;
}
  
.el-aside {
	min-height:calc(100vh - 60px);
	overflow: auto;
}
.el-main{
	height:calc(100vh - 60px);
	overflow: auto;
}
</style>