<template>
	<div>
		<div class="fl t-mb20" id="echartsMap" style="width:50%;height:500px"></div>
		<div class="fl t-mb20" id="echartsMapshanxi" style="width:50%;height:500px"></div>
		<div class="fl t-mb20" id='antvChart' style="width:50%;height:500px"></div>
		<div class="clear"></div>
	</div>
</template>

<script>
const mapdata = require('../../../static/json/china.json')
import 'echarts/map/js/province/shanxi'

// import { Chart } from '@antv/g2';
export default {
	data(){
		return{
			MapData:null,
			shanxiMap:null,
			data:[
				{ genre: 'Sports', sold: 275 },
				{ genre: 'Strategy', sold: 115 },
				{ genre: 'Action', sold: 120 },
				{ genre: 'Shooter', sold: 350 },
				{ genre: 'Other', sold: 150 },
			]
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
		},
		antv(){
			const antvChart = new this.$chart({
				container:'antvChart',
				autoFit: true,
				height: 500,
			})
			// Step 2: 载入数据源
			antvChart.source(this.data);
			// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
			antvChart.interval().position('genre*sold').color('genre')
			// Step 4: 渲染图表
			antvChart.render();
		}
	},
	mounted(){
		this.getMap()
		this.antv()
	}
}
</script>

<style>

</style>