<template>
	<div>
		<div id="qr" ></div>

		<el-button @click="savePic" size="small">保存二维码</el-button>
	</div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
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
		}
	},
	mounted(){
		this.qr()
	}
}
</script>

<style>

</style>