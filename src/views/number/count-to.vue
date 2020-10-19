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
		}
	}
}
</script>

<style>

</style>