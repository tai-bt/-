<template>
	<div class="tr mb-10">
		<el-button @click="exportResult" type="primary" size="mini" icon="el-icon-download">download</el-button>
	</div>
</template>

<script>
var XLSX = require("xlsx")
import FileSaver from 'file-saver'
export default {
data(){
	return {
		list: [
			{
				title: '第一页',
				contents: [['姓名', '年龄', '性别'], ['张', 18, '女'],['tai', 18, 'nan']],
			},
			{
				title: '第二页',
				contents: [['姓名', '年龄', '性别'], ['张', 18, '女']],
			},
			{
				title: '第三页',
				contents: [['姓名', '年龄', '性别'], ['张', 18, '女']],
			}
		],
		exportName: ''
	}
},
methods: {
	exportResult () {
		let workbook = XLSX.utils.book_new()
		for (var i = 0; i < this.list.length; i++) {
			let worksheet = XLSX.utils.aoa_to_sheet(this.list[i].contents)
			XLSX.utils.book_append_sheet(workbook, worksheet, `${this.list[i].title}`)
		}
		const wbout = XLSX.write(workbook, {bookType: 'xlsx', bookSST: true, type: 'array'})
		const date = this.$options.filters.GMTToStr(new Date())
		FileSaver.saveAs(
			new Blob([wbout], {type: 'application/octet-stream'}),
			`${this.exportName}结果表-${date}.xlsx`
		)
	}
}
}
</script>