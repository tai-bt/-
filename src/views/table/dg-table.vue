<template>
	<div class="tableOut">
		<el-button @click="changeSort">变</el-button>
		<dg-table
			border
			:configs="configs"
			tableId='account'
			@filter-change="filterChange"

			:data="tableData"
			height="500"
			@row-click='rowClick'
			@selection-change="handleSelectionChange"
			stripe
			highlight-current-row
		></dg-table>
	</div>
</template>

<script>
import MyInput from './datePicker'
export default {
	data(){
		return{
			configs:[
				{
					columnConfig: {
						prop: "name",
						label: "姓名"
					},
					filterConfig: {
						type: 'custom',
						component: MyInput
					},
				},
				{
					columnConfig: {
						prop: "age",
						label: "年龄",
						sortable: true
					}
				},
				{
					columnConfig: {
						prop: "gender",
						label: "性别",
						filters: [
							{text: '男', value: '男'},
							{text: '女', value: '女'}
						],
						filterMethod: (value, row, column) => {
							const property = column['property'];
							return row[property] === value;
						}
					},
				},
				{
					columnConfig: {
						prop: "birthPlace",
						label: "出生地",
					},
					filterConfig: {
						type: 'custom',
						component: MyInput
					}, 
				},
				{
					columnConfig: {
						prop: "birthDay",
						label: "出生日期",
					},
					filterConfig: {
						type: 'date',
					}
				},
			],
			tableData: [],
			ds: [
				{
					prop: 'age',
					order: null, // ascending  descending
				},
				{
					prop: 'birthDay',
					order: null, // ascending  descending
				},
			],
		}
	},
	methods:{
		filterChange(filters){
			if(filters.res && filters.res.value[0] == 'sort'){
				this.changeSort(filters.res.value[1])
			}
		},
		rowClick(a){
			console.log(a)
		},
		handleSelectionChange(a){
			console.log(a)
		},
		setTableData(){
			var str = '暑假是每个学生向往的在暑假里没有了闹钟的喧嚣没有了与作业抗战的学生们却多了一丝令学生们撒野天地但是在这个暑假有一群学生们过道有一些不一样'
			for(var i=1; i<=50; i++){

				this.tableData.push(
					{
						name: str.slice()[i],
						age: Math.ceil(Math.random()*100),
						gender:i%2 == 0?'男':'女', 
						birthPlace:i + '出生地',
						birthDay:i + 'birthDay',
					}
				)
			}

		},
		pySort(arr,key){
			var $this = this;
			if(!String.prototype.localeCompare) return null;
			
			//修正位置
			var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
			var zh = "阿八嚓哒妸发旮哈*讥咔垃痳拏噢妑七呥扨它**穵夕丫帀".split('');
			
			var arrList = [];
			for(var m =0;m<arr.length;m++){
				arrList.push(arr[m]);
			}
			var result = [];
			var curr;
			for(var i=0;i<letters.length;i++){
				curr = {letter: letters[i], data:[]};
				if(i!=26){
					for(var j =0;j<arrList.length;j++){
						var initial = arrList[j][key].charAt(0);//截取第一个字符
						if(arrList[j][key].charAt(0)==letters[i]||arrList[j][key].charAt(0)==letters[i].toLowerCase()){   //首字符是英文的
							curr.data.push(arrList[j]);
						}else if(zh[i]!='*'&&$this.isChinese(initial)){      //判断是否是无汉字,是否是中文
							if(initial.localeCompare(zh[i]) >= 0 &&(!zh[i+1]||initial.localeCompare(zh[i+1]) <0)) {   //判断中文字符在哪一个类别
								curr.data.push(arrList[j]);
							}
						}
					}
				}else{
					for(var k =0;k<arrList.length;k++){
						var ini = arrList[k].charAt(0);           //截取第一个字符
						if(!$this.isChar(ini)&&!$this.isChinese(ini)){
							curr.data.push(arrList[k]);
						}
					}
				}
				if(curr.data.length) {
					result.push(curr);
					//curr.data.sort(function(a,b){
					//    return b.localeCompare(a);       //排序,英文排序,汉字排在英文后面
					//});
				}
			}
			return result;
		},
		isChinese(temp){
			var re=/[^\u4E00-\u9FA5]/;
			if (re.test(temp)){return false;}
			return true ;
		},
		isChar(char){
			var reg = /[A-Za-z]/;
			if (!reg.test(char)){return false ;}
			return true ;
		},
		changeSort(val){
			var lettersort = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
				ojb = [],
				arr = []

			if(val == 1){
				ojb = this.pySort(this.tableData,'name')
			}else if(val == 2){
				ojb = this.pySort(this.tableData,'name').reverse()
			}

			ojb.forEach((item,index)=>{
				if(item.data.length){
					arr.push(
						...item.data
					)
				}
			})

			this.tableData = arr
		}
	},
	mounted(){
		this.setTableData()
		
	}
}
</script>

<style lang='scss' scoped>
	.tableOut{
		position: relative;
	}
</style>