<template>
	<div>
		<el-table
			:ref="'table' + myref"
			:data="data"
			style="width: 100%"
			:height="tableHeight"
			tooltip-effect="light"
			>
			<components
				v-for="(item,index) in headerList"
				:key="index"
				:data='item'
				:is='item.components'
				@tabCheckAll='tabCheckAll'
				@tabCheckNow='tabCheckNow'
				@tabCheckbox='tabCheckbox'

				@checkState='checkState'
			></components>
		</el-table>
	</div>
</template>

<script>
export default {
	props:['header','data','height','checkedList','myref','total','employeeList'],
	data(){
		return{
			tableHeight:200
		}
	},
	watch:{
		height(res){
			setTimeout(()=>{
				this.tableHeight = res
			},400)
		},
		checkedList(res){
			this.selectList = [...res]
			this.$nextTick(()=>{
				this.toggleRowSelection()
			})
		},
		data(res){
			this.$nextTick(()=>{
				this.toggleRowSelection()
			})
			this.nowPageAllId = []
			res.forEach((item,index)=>{
				if(item['ID']){
					this.nowPageAllId.push(item['ID'])
				}
			})

			this.setCheckAll()
		},
		selectList(res){
			this.$emit('getSelect',res)
		}
	},
	computed:{
		headerList(){
			let list = [...this.header]
			if(list.length > 0){
				list.unshift(
					{
						width:1,
						// components:'tabsearch'
					}
				)
			}
			return list
		},
	},
	methods:{
		tabCheckAll(){},
		tabCheckNow(){},
		tabCheckbox(){},
		checkState(){},
	}
}
</script>

<style>

</style>