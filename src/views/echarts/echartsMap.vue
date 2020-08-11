<template>
	<div>
		<div class="fl" id="echartsMap" style="width:50%;height:500px"></div>
		<div class="fl" id="echartsMapshanxi" style="width:50%;height:500px"></div>
	</div>
</template>

<script>
const mapdata = require('../../../static/json/china.json')
import 'echarts/map/js/province/shanxi'
export default {
	data(){
		return{
			MapData:null,
			shanxiMap:null
		}
	},
	methods:{
		getMap(){
			var list = mapdata.features,
				map = list.filter((item,index)=>{
					return item.properties.name.indexOf('山西') != -1
				})
			this.MapData = mapdata
			this.shanxiMap = map
			this.echarts()
			this.echartsSX()
		},
		echarts(){
			var echartsMap = this.$echarts.init(
				document.getElementById('echartsMap')
			)
			this.$echarts.registerMap('China', this.MapData);
			echartsMap.setOption({
				title: {
					text: '中国地图',
				},
				visualMap: {
					min: 0,
					max: 999999,
					text: ['High', 'Low'],
					realtime: false,
					calculable: true,
					inRange: {
						color: ['lightskyblue', 'yellow', 'orangered']
					}
				},
				series: [
					{
						name: 'China',
						type: 'map',
						roam: true,
						mapType: 'China', // 自定义扩展图表类型
						label: {
							show: true
						},
						data:[
							{
								name:'山西省',
								value:99999
							}
						]
					}
				]
			})
		},
		echartsSX(){
			var echartsMapshanxi = this.$echarts.init(
				document.getElementById('echartsMapshanxi')
			)
			// this.$echarts.registerMap('shanxi', this.shanxiMap);
			echartsMapshanxi.setOption({
				title: {
					text: '山西地图',
				},
				visualMap: {
					min: 0,
					max: 999999,
					text: ['High', 'Low'],
					realtime: false,
					calculable: true,
					inRange: {
						color: ['lightskyblue', 'yellow', 'orangered']
					}
				},
				series: [
					{
						name: '山西',
						type: 'map',
						map:'山西',
						roam: true,
						label: {
							show: true
						},
						data:[
							{
								name:'山西省',
								value:99999
							}
						]
					}
				]
			})
		}
	},
	mounted(){
		this.getMap()
	}
}
</script>

<style>

</style>