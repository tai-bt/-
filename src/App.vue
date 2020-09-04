<template>
	<div id="app">
		<router-view/>
		<div @click="scrollToTop" v-show="showIs" id="back-to-top" class="transition-box back-to-top">
			<img style="width:30px; margin-top:10px;"  src="./assets/gotop.png" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'app',
	data(){
		return{
			showIs:false
		}
	},
	methods:{
		scrollToTop(){
			const c = document.documentElement.scrollTop || document.body.scrollTop;
			if (c > 0) {
				window.requestAnimationFrame(this.scrollToTop);
				window.scrollTo(0, c - c / 20);
			}
		},
		backTopShowOperate : function() {
			if (window.scrollY > 300) {
				this.showIs = true;
			} else {
				this.showIs = false;
			}
		},

		// 数组对象去重
		removal(person){
			let obj = {};

			let peon = person.reduce((cur,next) => {
				obj[next.id] ? "" : obj[next.id] = true && cur.push(next);
				return cur;
			},[]) 
			return peon
		},
	},
	mounted(){
		window.addEventListener("scroll", this.backTopShowOperate, true);
	}
}
</script>

<style scoped lang='scss'>
#back-to-top{
	width: 50px;
	height: 50px;
	cursor: pointer;
	background-color: #7eb8f5;
	border-radius: 100%;
	text-align: center;
	line-height: 25px;
	position: fixed;
	bottom:50px;
	right: 50px;
	z-index: 999;
}
#back-to-top span{
	font-size: 30px;
    line-height: 50px;
    text-align: center;
    display: inline-block;
    width: 100%;
    height: 100%;
}
#app{
	background-image: url('./assets/backgroundimg.png');
}
</style>
