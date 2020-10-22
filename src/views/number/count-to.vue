<template>
	<div>
		<count-to
			ref="example"
			:start-val="startVal"
			:end-val="endVal"
			:duration="duration"
			:decimals='decimals'
			:autoplay="true"
			class="example"
		/>

		<div ref="hello">
			<!-- <h1>Hello World ~</h1> -->
			<h1>{{value}}</h1>
		</div>
		<el-button @click="get">qqqqqq</el-button>
	</div>
</template>

<script>
import countTo from 'vue-count-to'
// https://blog.csdn.net/weixin_40340067/article/details/84232077   参考文档
export default {
	components: { countTo },
	data(){
		return{
			startVal:0,
			endVal:5321,
			duration:1000,// 延长时间
			decimals:2,// 小数点

			value:'Hello World ~'
		}
	},
	methods:{
		get(){
			this.value = '你好啊';
			console.log(this.$refs['hello'].innerText);
			this.$nextTick(() => {
				console.log(this.$refs['hello'].innerText);
			});
		}
	},
	// mounted(){
	// 	console.log(333);
	// 	console.log(this.$refs['hello']);
	// 	this.$nextTick(() => {
	// 		console.log(444);
	// 		console.log(this.$refs['hello']);
	// 	});
	// },
	// created() {
	// 	console.log(111);
	// 	console.log(this.$refs['hello']);
	// 	this.$nextTick(() => {
	// 		console.log(222);
	// 		console.log(this.$refs['hello']);
	// 	});
    // }
}
</script>

<style>

</style>