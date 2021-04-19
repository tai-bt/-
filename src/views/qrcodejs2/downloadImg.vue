<template>
	<div>
		<div id="qr" ></div>

		<el-button @click="savePic" size="small">保存二维码</el-button>

		<el-form ref="form" :inline="true" :model="formInline" class="demo-form-inline" :rules="rules">
			<el-form-item label="审批人" prop="name">
				<el-input v-model="formInline.name" placeholder="审批人"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit('form')">查询</el-button>
			</el-form-item>
		</el-form>

		<!-- <hello :data="'asgdkjashdkjahskj'"></hello>
		<hello :data="{name:'12312'}"></hello> -->
	</div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
	data(){
		return{
			rules:{
				name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
			},
			formInline:{
				name:''
			}
		}
	},
	methods:{
		qr() {
			let qr = new QRCode("qr", {
				 width: 195,
				height: 195, // 高度
				text: 'ahahahahahhhaahaha' // 二维码内容
			});
		},
		 // 保存二维码
		savePic() {
			let myCanvas = document.getElementById("qr").getElementsByTagName("canvas");
			let a = document.createElement("a");
			a.href = myCanvas[0].toDataURL("image/png");
			a.download = "付款二维码";
			a.click();
			alert("下载成功");
		},
		onSubmit(formName){
			if(this.rule(formName)){
				alert('通过')
			}else{
				alert('重新填写')
			}
		},
	},
	mounted(){
		this.qr()
	}
}
</script>

<style>

</style>