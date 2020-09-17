<template>
	<div>
		<div style="position:fixed;top:-300vh">
			<canvasImg v-for="(item,index) in list" :key="index" :type="'sss'" :listCan='[item]' :tabInd='index'></canvasImg>
		</div>
		<img :src="basUrl('sss',index)" v-for="(item,index) in list" :key="index" style="width:100%">
	</div>
</template>

<script>
import canvasImg from './html2canvas'
export default {
	data(){
		return{
			list:[
				{
					"label":"https://sinanspapi.topcredit.net.cn/group1/M02/00/11/wKgBal9Zj1yASY4WAAAOLbw9lQA421.png",
					"picture":"https://sinanspapi.topcredit.net.cn/group1/M02/00/11/wKgBal9ZkJCAYL5GACkYTU1DpUM851.png",
					"content":"我也不知道写啥好",
					"basUrl":''
				},
				{
					"label":"https://sinanspapi.topcredit.net.cn/group1/M02/00/11/wKgBal9Zj1yASY4WAAAOLbw9lQA421.png",
					"picture":"https://sinanspapi.topcredit.net.cn/group1/M02/00/11/wKgBal9ZkP2AQLjJAAvop0mrYMk738.png",
					"content":"我也不知道写啥好",
					"basUrl":''
				}
			]
		}
	},
	components:{
		canvasImg
	},
	methods:{
		basUrl(type,val){
			return sessionStorage.getItem('canvas'+type+val)
		}
	},
}
</script>

<style scoped lang='scss'>
</style>