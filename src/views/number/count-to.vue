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

		<div ref="hello">
			<!-- <h1>Hello World ~</h1> -->
			<h1>{{value}}</h1>
		</div>
		<el-button @click="get">qqqqqq</el-button>



		<br />
		<span class="title">{{$t('message.login')}}</span>
		<el-dropdown @command="handleCommand">
			<span class="el-dropdown-link">
					中英文切换
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="cn">中文</el-dropdown-item>
				<el-dropdown-item command="en">英文</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
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

			value:'Hello World ~',
			value1: '',
			obj:{
				name: '文化节',
				pick: '499',
				oldPick:'599',
				list:[
					{
						name:'灰姑娘校区',
						timeValid: '3-12周岁',
						distance: '0.7KM',
						content:[
							{
								name: '启蒙芭蕾',
								number: '300',
								time: '30分钟',
								cishu: '4次',
								checked: false
							},
							{
								name: '启蒙芭蕾',
								number: '300',
								time: '30分钟',
								cishu: '4次',
								checked: false
							},
							{
								name: '启蒙芭蕾',
								number: '300',
								time: '30分钟',
								cishu: '4次',
								checked: false
							},
						]
					},
					{
						name:'美术',
						timeValid: '3-12周岁',
						distance: '0.7KM',
						content:[
							{
								name: '启蒙芭蕾',
								number: '300',
								time: '30分钟',
								cishu: '4次',
								checked: false
							},
							{
								name: '启蒙芭蕾',
								number: '300',
								time: '30分钟',
								cishu: '4次',
								checked: false
							},
							{
								name: '启蒙芭蕾',
								number: '300',
								time: '30分钟',
								cishu: '4次',
								checked: false
							},
						]
					},
				]
			},
			lang: ''
		}
	},
	methods:{
		// 根据下拉框的中被选中的值切换语言
		handleCommand(command) {
			// this.$message("click on item " + command);
			switch (command) {
				case "cn": {
					this.lang = "cn";
					this.$i18n.locale = this.lang;
					break;
				}
				case "en": {
					this.lang = "en";
					this.$i18n.locale = this.lang;
					break;
				}

				default:
				break;
			}
		},
		get(){
			this.value = '你好啊';
			console.log(this.$refs['hello'].innerText);
			this.$nextTick(() => {
				console.log(this.$refs['hello'].innerText);
			});
		}
	},
	mounted(){
		console.log(this.$route)
		// console.log(333);
		// console.log(this.$refs['hello']);
		// this.$nextTick(() => {
		// 	console.log(444);
		// 	console.log(this.$refs['hello']);
		// });
	},
	// created() {
	// 	console.log(111);
	// 	console.log(this.$refs['hello']);
	// 	this.$nextTick(() => {
	// 		console.log(222);
	// 		console.log(this.$refs['hello']);
	// 	});
    // }
}
</script>

<style>

</style>