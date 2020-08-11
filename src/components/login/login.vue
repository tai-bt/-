<template>
	<div class="BGI">
		<div class="card">
			<h1>登录</h1>
			<el-form label-position="left" label-width="80px" :model="formLabelAlign">
				<el-form-item label="用户名">
					<el-input v-model="formLabelAlign.userName"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input type="password" v-model="formLabelAlign.userPassword"></el-input>
				</el-form-item>
			</el-form>
			<el-button @click="login">登录</el-button>
			<el-button @click="goRegister">无账号，去注册</el-button>
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
			},
		}
	},
	methods:{
		login(){
			this.$http.post('/mysql/user/login',this.formLabelAlign).then((res)=>{
				if(res.data.code == 0){
					this.$message.success(res.data.message)
					sessionStorage.setItem('userId',res.data.data)
					this.$router.push({path:'/'})
				}else{
					this.$message.warning(res.data.message)
				}
			})
		},
		goRegister(){
			this.$router.push({path:'/register'})
		}
	},
	mounted(){
		sessionStorage.clear()
	}
}
</script>

<style scoped lang='scss'>
	.BGI{
		width: 100%;
		height: 100vh;
		background-image: url('../../assets/BGIMG.jpg');
		background-size: 100%;
		background-position: center;
	}
</style>