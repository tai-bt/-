<template>
	<div>
		<button @click="addParentMenu">qqweqweqw</button>
	</div>
</template>

<script>
export default {
	data(){
		return{
			userId:sessionStorage.getItem('userId'),
			partantMenu:{
				userId:sessionStorage.getItem('userId'),
				id:'',
				name:'第一个',
				parentId:0,
				routerLink:''
			}
		}
	},
	methods:{
		getMenuList(){
			this.$http.post('/mysql/menuList',{
				userId:this.userId
			}).then((res)=>{
				console.log(res)
			})
		},
		addParentMenu(){
			this.partantMenu.id = new Date().getTime()
			console.log(this.partantMenu)
			this.$http.post('/mysql/addParentMenu',this.partantMenu).then((res)=>{
				console.log(res)
			})
		}
	},
	mounted(){
		this.getMenuList()
	}
}
</script>

<style>

</style>