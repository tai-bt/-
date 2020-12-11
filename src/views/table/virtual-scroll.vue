<template>
	<div>
		<el-table border :data="tabData" style="width: 100%">
			<el-table-column prop="id" label="日期">
			</el-table-column>
			<el-table-column prop="name" label="姓名">
				<template slot-scope="scoped">
					<el-input v-model="scoped.row.name"></el-input>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import itemData from './itemData'
export default {
	components:{
	},
	data() {
		return {
			items: [],
			tabData:[],
			number:200
		};
	},
	methods: {
		qwe(){
			console.log(this.items)
		},
		dataSource() {
			for (let i = 1; i <= 900; i++) {
				this.items.push({
					id: i,
					name: i + "模拟字段",
				});
			}

			this.setTabData()

		},
		backTopShowOperate : function() {
			var scrollTop = document.getElementById('scroll').scrollTop.toFixed(0),
				scrollHeight = document.getElementById('scroll').scrollHeight
			if(this.items.length == this.tabData.length) return
			if(scrollHeight - scrollTop < 800){
				this.setTabData()
			}
		},
		setTabData(){
			var arr = this.items.slice(
					this.tabData.length,
					this.tabData.length+this.number
				)
			this.tabData.push(...arr)

		}
	},
	created() {
		this.dataSource();
	},
	mounted(){
		window.addEventListener("scroll", this.backTopShowOperate, true);
	},
	beforeDestroy(){
		window.removeEventListener("scroll", this.backTopShowOperate, true);
	}
}
</script>

<style>

</style>