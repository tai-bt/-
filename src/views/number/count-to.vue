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
		<br/>
		<el-input v-tbt v-model="number"></el-input>
		<!-- <input type="text" v-model="number"> -->
		<el-button @click="getFrom('formMap.name')">dasda</el-button>

		{{comput1}}--
		{{comput2}}--
		{{comput3}}

		{{syncTest}}
		<qqq :syncTest.sync='syncTest'>
			<p v-for="i in 10" :key="i" :slot="i%2 == 0?'two':''">{{i}}</p>
		</qqq>
		<hr>
		{{minxinsT}}
	</div>
</template>

<script>
import countTo from 'vue-count-to'
// https://blog.csdn.net/weixin_40340067/article/details/84232077   参考文档
import qqq from './qqq'
import minxins from './minxins.js'
export default {
	components: { countTo , qqq},
	mixins:[minxins],
	data(){
		return{
			startVal:0,
			endVal:5321,
			duration:1000,// 延长时间
			decimals:2,// 小数点

			value:'Hello World ~',
			value1: '',
			lang: '',
			number: 0,
			formMap: {
				name: '123'
			},
			name:"formMap",
			comput1: 'qqq',
			comput2: 'www',
			qqqShowIs: true,
			syncTest: '这是测试的东西',
			minxinsT: 'count'
		}
	},
	computed:{
		comput3:{
			get() {
				return this.comput1 + ',' + this.comput2
			},
			set(newValue){
				let val = newValue.split(',')
				this.comput1 = val[0]
				this.comput2 = val[1]
			}
		}
	},
	directives: {
		tbt: {
			inserted: function(el) {
				el.handler = function () {
					let val = el.getElementsByTagName('input')[0]
					val.value = Number(val.value).toFixed(2)
				}
				el.addEventListener('change', el.handler)
			},
			// componentUpdated: function(el) { //组件更新
			// 	let val = el.getElementsByTagName('input')[0]
			// 	console.log(val.value)
			// 	val.value = Number(val.value).toFixed(2)
			// 	console.log(val.value)
			// },
			unbind: function(el) {
				el.removeEventListener('change', el.handler)
			},
		}
	},
	methods:{
		getFrom(val){
			eval(`this.${val} = 456`)
			console.log(this.formMap)
			// console.log(this[eval(val)])
		},
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
		},
		getmenu(){
			var _this = this
			_this.$post(_this.utilMap.apis.getmenu).then((res)=>{
				console.log('getmenu')
				this.number = 1.74658435468
			})
		},
		getvariety(){
			var _this = this
			_this.$post(_this.utilMap.apis.getvariety).then((res)=>{
				console.log('getvariety')
			})
		},
		getHistory(){
			var _this = this
			_this.$get(_this.utilMap.apis.getHistory).then((res)=>{
				console.log('getHistory')
			})
		},
		async getallData () {
			await this.getvariety() 
			await this.getmenu()
			await this.getHistory() 
		}
	},
	beforeCreate(){
		// console.log('beforeCreate', 'count')
	},
	created(){
		// console.log('created', 'count')
	},
	beforeMount(){
		// console.log('beforeMount', 'count')
	},
	mounted(){
		// console.log('mounted', 'count')
		setTimeout(()=>{
			this.qqqShowIs = false
		}, 5000)
		// console.log(this.$route)
		// console.log(333);
		// console.log(this.$refs['hello']);
		// this.$nextTick(() => {
		// 	console.log(444);
		// 	console.log(this.$refs['hello']);
		// });
		// 依次调接口
		this.getallData()
	},
	beforeUpdate(){
		// console.log('beforeUpdate', 'count')
	},
	updated(){
		// console.log('updated', 'count')
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