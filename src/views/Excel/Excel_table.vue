<template>
    <div>
		<el-upload
			action
			ref="upload"
			accept=".xlsx, .xls"
			:auto-upload="false"
			:show-file-list="false"
			:on-change="exportData"
		>
			<el-button type="primary">选取EXCEL文件</el-button>
		</el-upload>

		<el-table border v-for="(item, index) in excelList" :key="index" :data="item.tableData" style="width: 50%; margin-bottom: 10px">
			<el-table-column 
				v-for="(itm, ind) in item.tableHead"
				:key="ind"
				:prop="itm.prop"
				:label="itm.label"
				>
			</el-table-column>
		</el-table>
	</div>
	


</template>

<script>
// import XLSX from "xlsx";
var XLSX = require("xlsx")
export default {
	data(){
		return{
			vuex:this.$store.state.vuex,
			num: 1,
			excelList: []

		}
	},
	methods:{
		exportData(file) {
			console.log(file.name)
			this.$refs.upload.clearFiles() // 上传成功之后清除历史记录
			let type = file.name.replace(/.+\./, '') // 文件类型
			if(['xls','xlsx'].indexOf(type.toLowerCase()) === -1) {
				this.$message({
					title: '操作失败',
					icon: 'error',
					content: '文件格式支持xls、xlsx!'
				})
				return false;
			}else {
				const fileReader = new FileReader()
				fileReader.onload = ev => {
					try {
						const data = ev.target.result
						const workbook = XLSX.read(data,{type: "binary"})
						// console.log(this.setList(workbook.SheetNames, workbook.Sheets))
						this.excelList = this.setList(workbook.SheetNames, workbook.Sheets)
					}catch(e) {
						console.log(e,'eeeeeeeeeeeeee')
						this.$message({
							title: '操作失败',
							icon: 'error',
							content: '分配模板导入失败！'
						})
					}
				}
				fileReader.readAsBinaryString(file.raw)
			}
		},
		setList(SheetNames, Sheets){
			let list = []
			for (var i=0; i<SheetNames.length; i++) {
				let obj = {
					tableData: [],
					tableHead: []
				}
				// 获取还未处理的表格的数据
				const workSheet = Sheets[SheetNames[i] ]
				//  生成json表格内容
				const ws = XLSX.utils.sheet_to_json(workSheet)
				obj.tableData = ws

				Object.keys(ws[0]).forEach((item, index)=>{
					console.log(item)
					obj.tableHead.push({
						label: item,
						prop: item
					})
				})

				list.push(obj)
			}

			return list
		}
	}
}
</script>

<style>

</style>