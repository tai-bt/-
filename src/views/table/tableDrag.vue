<template>
	<div>
		<DragDrop :TabList='TabList' :TabHead='TabHead' :tags='tags'></DragDrop>
	</div>
</template>

<script>
import DragDrop from './Dragdrop'
export default {
	components:{DragDrop},
	data(){
		return{
			TabList:[
				{
					name:['小名','小红'],
					thing:['吃']
				},
				{
					name:['小名','小红'],
					thing:['喝']
				},
				{
					name:['小名','小红'],
					thing:['玩']
				},
				{
					name:['小名','小红'],
					thing:['乐']
				},
			],
			TabHead:[
				{
					prop:'name',
					label:'名称'
				},
				{
					prop:'thing',
					label:'事情'
				},
			],
			tags:['ha','he','hu','hi']
		}
	}
}
</script>

<style>

</style>