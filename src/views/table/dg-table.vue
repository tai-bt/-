<template>
	<div>
		<component_table
			:header='header'
			:data='data'
			:height='height'
		></component_table>
	</div>
</template>

<script>
import component_table from './tab_search/component_table'
export default {
	components:{
		component_table
	},
	data(){
		return{
			header:[
				{

				}
			],
			data:[],
			height:200,
		}
	}
}
</script>

<style scoped lang='scss'>

</style>