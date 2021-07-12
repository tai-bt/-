<template>
	<div>
		<DragDrop :TabList='TabList' :TabHead='TabHead' :tags='tags'></DragDrop>

		<el-table
			:data="tableData"
			style="width: 100%"
			border
			@expand-change='expandIs'
			>
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
					<el-form-item label="商品名称">
						<span>{{ props.row.name }}</span>
					</el-form-item>
					<el-form-item label="所属店铺">
						<span>{{ props.row.shop }}</span>
					</el-form-item>
					<el-form-item label="商品 ID">
						<span>{{ props.row.id }}</span>
					</el-form-item>
					<el-form-item label="店铺 ID">
						<span>{{ props.row.shopId }}</span>
					</el-form-item>
					<el-form-item label="商品分类">
						<span>{{ props.row.category }}</span>
					</el-form-item>
					<el-form-item label="店铺地址">
						<span>{{ props.row.address }}</span>
					</el-form-item>
					<el-form-item label="商品描述">
						<span>{{ props.row.desc }}</span>
					</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column
				label="商品 ID"
				prop="id">
			</el-table-column>
				<el-table-column
				label="商品名称"
				prop="name">
			</el-table-column>
			<el-table-column
				label="描述"
				prop="desc">
			</el-table-column>
		</el-table>
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
			tags:['ha','he','hu','hi'],
			tableData: [
				{
					id: '12987122',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333'
				}, 
				{
					id: '12987123',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333'
				}, 
				{
					id: '12987125',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333'
				}, 
				{
					id: '12987126',
					name: '好滋好味鸡蛋仔',
					category: '江浙小吃、小吃零食',
					desc: '荷兰优质淡奶，奶香浓而不腻',
					address: '上海市普陀区真北路',
					shop: '王小虎夫妻店',
					shopId: '10333'
				}
			]
		}
	},
	methods:{
		expandIs(row, expandedRows){
			console.log(row, expandedRows)
			let findIs = expandedRows.some((item, index) => {
				return item.id == row.id
			})
			if(findIs){
				console.log('调接口')
			}else{
				console.log('不调接口')
			}
		}
	}
}
</script>

<style>

</style>