<template>
	<div>
		<el-table
			:data="tableData"
			border
			:style="{'min-width': width, width: '100%'}"
			:height="height"
			:ref="'table' + refNum"
			@sort-change="sortChange"
			@select="selectChange"
			@select-all="selectAll"
			stripe
			:row-class-name="rowClassName"
			empty-text="没有相关记录！"
		>
			<el-table-column
				type="check"
				width="55">
				<!-- <template slot-scope="scope">
					<el-checkbox v-model="scope.row.checked"></el-checkbox>
				</template> -->
			</el-table-column>
			<el-table-column type="expand">
				<template slot-scope="props" style="width: 3200px">
					<tableBigData :tableHead="tableHead" :height="200" :refNum="'2'" :autoCellWidth="true"></tableBigData>
				</template>
			</el-table-column>
			<el-table-column
				v-for="(item, index) in tableHead"
				:key="index"
				:prop="item.prop"
				:label="item.label"
				:width="item.width || columnWidth || 100"
			>
				<template slot-scope="scope">
					<tInput :valueNum="scope.row[item.prop]" @dataChange="prant(scope.row,item.prop,scope.$index,$event)"></tInput>
					<!-- <el-input v-model.lazy="scope.row[item.prop]"></el-input> -->
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import tInput from './t-input.vue'
export default {
	name: 'tableBigData',
	components:{
		tInput
	},
	props: {
		tableDataAll: {
			type: Array,
			default: ()=>{
				return []
			}
		},
		tableHead: {
			type: Array,
			default: ()=>{
				return []
			}
		},
		height: {
			type: Number,
			default: 500
		},
		width: {
			type: String,
			default: ''
		},
		refNum: {
			type: String,
			default: ''
		},
		size: {
			// bigData 为 true 时才有用
			type: Number,
			default: 50
		},
		/**
		 * 是否让表格每列根据显示区域平均分配，改参数对设置列宽的列无效，如果为true，就不会出现横向滚动条（除了列特别多的情况）
		 * 开启后，列的min-width也会时效，因为width<min-width时，会使用width的宽
		 */
		autoCellWidth: {
			type: Boolean,
			default: false
		},
		/**
		 * bigData为false是一次性显示tableDataAll所有数据
		 * bigData为ture fixedDataNum 为 false时   滚动条往下滚动，显示剩余数据，但数据多并且往下滚动太多  还是会卡
		 * bigData和true fixedDataNum 为 true 时 只显示固定条数的数据
		 */
		bigData: {
			type: Boolean,
			default: false
		},
		/**
		 * 固定展示条数
		 */
		fixedDataNum: {
			//  bigData为true时才起作用
			type: Boolean,
			default: false
		},
		// 分页保存并显示选中数据
		memoryCheck: {
			type: Boolean,
			default: true,
		},
		// 默认排序字段
		defaultSort: {
			default: ''
		},
		// 默认排序规则
		defaultSortRule: {
			default: ''
		},
		// 根据此字段来判断是否给某行加特定的class
		opener: {
			type: String,
			default: ''
		}
	},
	data(){
		return{
			page: 1,
			tableData: [],
			expandAllIs: false,
			scrollDir: 0, // 用来判断滚动条滚动方向
			columnWidth: '', // 平均分配表头
			surplusWidth: '', // 分配完由于四舍五入的原因剩余的宽度
			checkedList: [], // 选中数据
			selectAllIs: false, // 是否全选，用于bigData为true是鼠标滚动也可以选中更新出来的新数据
		}
	},
	watch:{
		tableDataAll(res){
			if (res.length > 0) {
				this.setTabData('down')
				this.setCheckMemory()
			} else {
				this.tableData = []
			}
		},
	},
	methods:{
		operateIs(row) {
			return row
		},
		// 设置表格行的 class
		rowClassName({row, roIndex}) {
			return ''
		},
		// 表格按钮
		tableEvent(val) {
			this.$emit('tableEvent', val)
		},
		// 表格选中记忆
		setCheckMemory() {
			if (this.memoryCheck) {
				this.toggleRowSelection()
			} else {
				this.clearSelection()
			}
		},
		// 设置表格展示数据
		setTabData(dirIs) {
			if (this.bigData) {
				var start, end
				/**
				 * 首屏显示     0-49的数据
				 * 二屏显示     40-100的数据
				 * 三屏显示     90-150的数据
				 * 依次类推
				 * 多显示上一瓶的数据是为了方便查看数据，如果不显示之前的数据  会有部分数据看不到
				 * 鼠标向上滚动和向下滚动逻辑是一样的
				 */
				if (dirIs === 'up' && this.fixedDataNum) {
					start = (this.page - 1) * this.size
					end = this.page * this.size + (this.page > 1 ? 10 : 0)
				} else if (dirIs = 'down' && this.fixedDataNum) {
					start = (this.page - 1) * this.size = (this.page > 1 ? 10 : 0)
					end = this.page * this.size
				} else {
					start = this.tableData.length
					end = this.tableData.length + this.size
				}
				var arr = []
				arr = this.tableDataAll.slice(start, end)
				if (this.bigData && this.fixedDataNum) {
					this.tableData = [...arr]
				} else if (this.bigData && !this.fixedDataNum) {
					this.tableData.push(...arr)
				}
				this.toggleRowSelection()
			} else {
				this.tableData = this.tableDataAll
			}
		},
		scrollWatch() {
			var scrollTop = this.$refs['table' + this.refNum].bodyWrapper.scrollTop
			var scrollHeight = this.$refs['table' + this.refNum].bodyWrapper.scrollHeight
			var scroll = scrollTop - this.scrollDir
			this.scrollDir = scrollTop;
			if (this.fixedDataNum) {
				if (scroll < 0) {
					// 鼠标往上滚动
					if (scrollTop < 100 && this.page > 1) {
						this.page = this.page > 1 ? this.page - 1 : this.page
						this.setTabData('up')
						this.$nextTick(() => {
							this.$refs['table' + this.refNum].bodyWrapper.scrollTop = this.$refs['table' + this.refNum].bodyWrapper.scrollHeight - 1400
						})
					}
				} else {
					// 鼠标向下滚动
					let maxPahe = Math.ceil(this.tableDataAll.length / this.size)
					if (this.page === maxPahe) return
					if ((scrollHeight - scrollTop) < 660) {
						this.page = this.page + 1
						this.setTabData('down')
						this.$nextTick(() => {
							this.$refs['table' + this.refNum].bodyWrapper.scrollTop = 105
						})
					}
				}
			} else {
				if (this.tableDataAll.length === this.tableData.length) return
				if ((scrollHeight - scrollTop) < 660) {
					this.setTabData()
				}
			}
		},
		// 自适应宽度
		autoColumnWidth() {
			if (this.autoCellWidth) {
				// 可操作宽度 = （展示区域 - 所有已设置列的宽度）
				let operableWidth = this.$refs['table' + this.refNum].$el.offsetWidth
				let fixedWidth = 1
				let operableColumn = 0
				let scrollWidth = this.$refs['table' + this.refNum].$el.scrollHeight > this.$refs['table' + this.refNum].$el.offsetHeight ? 17 : 0
				for (var i = 0; i < this.tableDataAll.length; i++) {
					operableWidth = operableWidth - parseInt((this.tableDataAll[i].width || 0))
					fixedWidth = fixedWidth + parseInt((this.tableDataAll[i].width || 0))
					if (!this.tableDataAll[i].width) {
						operableColumn = operableColumn + 1
					}
				}

				let width = operableWidth / operableColumn
				this.columnWidth = parseInt(width)
				this.surplusWidth = this.$refs['table' + this.refNum].$el.offsetWidth - (this.columnWidth * operableColumn) - fixedWidth - scrollWidth
			}
		},
		//  排序
		sortChange({ column, prop, order }) {
			let obj = {
				properties: prop,
				direction: ''
			}
			if (order === 'ascending') {
				// 升序
				obj.direction = 'asc'
			} else if (order === 'descending') {
				// 降序
				obj.direction = 'desc'
			} else {
				obj = {
					properties: this.defaultSort,
					direction: this.defaultSortRule
				}
			}

			this.$emit('sort', obj)
		},
		ifCompare(obj1, obj2) {
			let keys1 = Object.keys(obj1)
			let keys2 = Object.keys(obj2)
			if (keys1.length !== keys2.length) return false
			for (let i = 0; i < keys1.length; i++) {
				let key = keys1[i]
				if (obj2[key] !== obj1[key]) return false
			}
			return true
		},
		// 单个选择
		selectChange(selection, row) {
			let checkIs = selection.indexOf(row) !== -1
			if (checkIs) {
				this.checkedList.push(row)
			} else {
				let index = ''
				for (var i = 0; i < this.checkedList.length; i++) {
					if (this.ifCompare(this.checkedList[i], row)) {
						index = i
						break;
					}
				}
				this.checkedList.splice(index, 1)
			}
		},
		// 全选
		selectAll(selection) {
			if (selection.length > this.checkedList.length) {
				if (this.bigData) {
					this.checkedList = this.tableDataAll
				} else {
					if (this.checkedList.length > 0) {
						selection.forEach((item, index) => {
							this.checkedList.forEach((itm, ind) => {
								if (this.ifCompare(item, itm)) {
									this.checkedList.push(item)
								}
							})
						});
					} else {
						selection.forEach(item => {
							this.checkedList.push(item)
						})
					}
				}
			} else {
				// 在bigData为true是直接调用清空方法
				if (this.bigData) {
					this.clearSelection()
				} else {
					this.tableData.forEach((item, index) => {
						let ind = this.checkedList.indexOf(item)
						this.checkedList.splice(ind, 1)
					})
				}
				this.selectAllIs = false
			}
		},
		// 显示已选
		toggleRowSelection() {
			this.$nextTick(() => {
				let list = []
				this.checkedList.forEach(item => {
					this.tableData.forEach(itm => {
						if (this.ifCompare(item, itm)) {
							list.push(itm)
						}
					})
				})
				// 设置选中要数据指针地址一样  所有用list惩戒与tableData指针地址一样的数据
				if (list.length) {
					list.forEach(item => {
						this.$refs['table' + this.refNum].toggleRowSelection(item, true)
					})
				} else {
					this.checkedList.forEach(item => {
						this.$refs['table' + this.refNum].toggleRowSelection(item, true)
					})
				}
			})
		},
		// 清空选中
		clearSelection() {
			this.$nextTick(() => {
				this.$refs['table', this.refNum].clearSelection()
				this.checkedList = []
			})
		},
		// 清空排序
		clearSort() {
			this.$nextTick(() => {
				this.$refs['table', this.refNum].clearSort()
			})
		},

		prant(val,key, index, num,){
			console.log('整行数据',val)
			console.log('修改的key',key)
			console.log('下标',index)
			console.log('子组件里的值', num)
			val[key] = num
		},
	},
	mounted(){
		if (this.bigData) {
			window.addEventListener("scroll", this.backTopShowOperate, true);
			this.setTabData('down')
		} else {
			this.setTabData()
		}
		this.autoColumnWidth()
	},
	beforeDestroy(){
		if (this.bigData) {
			window.removeEventListener("scroll", this.backTopShowOperate, true);
		}
	}
}
</script>

<style lang="scss" scoped>

</style>
<style>
.el-table__expanded-cell{
	overflow: auto
}
</style>