<template>
	<div class="BGI">
		<div class="card">
			<h1>注册</h1>
			<el-form label-position="left" label-width="80px" :model="formLabelAlign">
				<el-form-item label="用户名">
					<el-input v-model.trim="formLabelAlign.userName"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input type="password" v-model="formLabelAlign.userPassword"></el-input>
				</el-form-item>
				<el-form-item label="权限">
					<el-select style="width:100%" v-model="formLabelAlign.roleId" placeholder="请选择">
						<el-option
							v-for="item in roleList"
							:key="item.roleId"
							:label="item.name"
							:value="item.roleId">
						</el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<el-button @click="register">注册</el-button>
			<el-button @click="goLogin">已有账号，去登陆</el-button>
		</div>
	</div>
</template>

<script>
export default {
	data(){
		return{
			formLabelAlign: {
				userName: '',
				userPassword: '',
				roleId:''
			},
			roleList:[]
		}
	},
	methods:{
		register(){
			this.$http.post('/mysql/user/register',this.formLabelAlign).then((res)=>{
				if(res.data.code == 0){
					this.$message.success(res.data.message)
					this.$router.push({path:'/login'})
				}else{
					this.$message.warning(res.data.message)
				}
			})
		},
		getRole(){
			this.$http.get('/mysql/roleSelect').then((res)=>{
				this.roleList = res.data.data
			})
		},
		goLogin(){
			this.$router.push({path:'/login'})
		}
	},
	mounted(){
		this.getRole()
	}
}
</script>

<style scoped lang='scss'>
.BGI{
	width: 100%;
	height: 100vh;
	background-image: url("../../assets/register.jpg");
	background-size: 100%;
}
</style>