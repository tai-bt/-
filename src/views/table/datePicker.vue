<template>
	<div style="padding: 10px;width:200px">
		<ul>
			<li class="hand" @click="stoeOrder(1)"><i class="el-icon-sort"></i> 升序 A to Z</li>
			<li class="hand" @click="stoeOrder(2)"><i class="el-icon-sort"></i> 升序 Z to A</li>
		</ul>
		<hr class="t-mt6 t-mb6">
		<p class="title">内容搜索</p>
		<el-input placeholder="请输入内容" v-model="val" class="input-with-select t-mt6 t-mb6"></el-input>

		<el-button type="primary" class="fr" size="small" @click="confirm">确定</el-button>
		<div class="clear"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			val: '',
			sort:0
		}
	},
	methods: {
		confirm () {
			// {
			// 	value:this.val,
			// 	sort:this.sort
			// }
			this.$emit('__CUSTOM_FILTER_DATA__', {
				value: ['search',this.val],
			})
			this.val = ''
		},
		stoeOrder(val){
			this.sort = val

			this.$emit('__CUSTOM_FILTER_DATA__', {
				value: ['sort',val],
			})
		}
	}
}
</script>

<style lang="scss" scoped>
ul li{
	font-size: 13px;
	line-height: 25px;
}
.title{
	font-size: 13px;
}
</style>
