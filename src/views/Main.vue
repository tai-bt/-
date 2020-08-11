<template>
	<div>
		<el-container>
			<el-header>
				<el-button size="small" class="fr t-mr20 t-mt15">退出登录</el-button>
			</el-header>
			<el-container>
				<el-aside width="200px">
					<el-menu
						style="height:100%;width:100%"
						default-active="2"
						class="el-menu-vertical-demo"
						background-color="#545c64"
						text-color="#fff"
						active-text-color="#ffd04b"
					>
						<!-- 递归导航组件组件 -->
						<MenuLeft :menuList='menuList'></MenuLeft>
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
export default {
	components:{MenuLeft},
	data(){
		return{
			menuList:[
				{
					name:'导航一',
					id:'1'
				},
				{
					name:'导航二',
					id:'2',
					children:[
						{
							name:'导航二---1',
							id:'2-1',
						}
					]
				},
				{
					name:'导航三',
					id:'3',
					children:[
						{
							name:'导航三---1',
							id:'3-1',
							icon:'el-icon-picture-outline-round',
						}
					]
				},
			],
			list:[
				{
					name:'导航一',
					id:'1',
					parentId:0,
					childrenId:null
				},
				{
					name:'导航二',
					id:'2',
					parentId:0,
					childrenId:'2'
				},
				{
					name:'导航二---1',
					id:'2-1',
					parentId:'2',
					childrenId:null
				},
				{
					name:'导航三',
					id:'3',
					parentId:0,
					childrenId:'3'
				},
				{
					name:'导航三---1',
					id:'3-1',
					parentId:3,
					childrenId:null
				},
				{
					name:'导航三---2',
					id:'3-2',
					parentId:3,
					childrenId:null
				}
			]
		}
	},
	methods:{
		forList(){
			for(var i=this.list.length-1; i>=0; i--){
				for(var j=i-1; j>=0; j--){
					if(this.list[i] && this.list[j]){
						if(this.list[i].parentId == this.list[j].childrenId){
							var str = this.list[j].children && this.list[j].children.length>0?this.list[j].children:[]
							str.push(this.list[i])
							this.list[j].children = str
							this.list.splice(i,1)
						}
					}
				}
			}
			console.log(this.list)
		}
	},
	mounted(){
		this.forList()
	}
}
</script>

<style scoped lang='scss'>
.el-header{
    background-color: #cbd1da;
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