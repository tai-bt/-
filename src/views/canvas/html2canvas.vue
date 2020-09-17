<template>
	<div class="big">
		<div class="t-mt10" :class="tabInd == 0?'demoOne':'demoTwo'" v-for="(item,index) in listCan" :id="'capture'+type+tabInd" :key="index">
			<img class="loge" :src="item.label" alt="">
			<img class="banner" :src="item.picture" alt="">
			<p>{{item.content}}</p>
		</div>
		<div class="absolute opacity" :id="'mandImg'+type+tabInd" style="z-index:9"></div>
	</div>
</template>

<script>
export default {
	props:['listCan','tabInd','type'],
	data(){
		return{
			opts :{
				useCORS: true, // 【重要】开启跨域配置
				scale:0.8,
			},
		}
	},
	methods:{
		html(){
			var mandImg = document.getElementById('mandImg'+this.type+this.tabInd)
			var canvas = document.getElementById('imgCanvas'+this.type+this.tabInd)
			var capture = document.getElementById('capture'+this.type+this.tabInd)
			if(canvas){
				mandImg.removeChild(canvas)
			}
			this.$html2canvas(capture,this.opts).then(canvas => {
				canvas.id = ('imgCanvas'+this.type+this.tabInd)
				canvas.style.width = (capture.offsetWidth)+'px'
				canvas.style.height = (capture.offsetHeight)+'px'
				mandImg.appendChild(canvas)

				this.canvas()
			});

		},
		canvas(){
			var c=document.getElementById("imgCanvas"+this.type+this.tabInd);
			var imgsrc=c.toDataURL()
			sessionStorage.setItem(('canvas'+this.type+this.tabInd),imgsrc)
		},
	},
	mounted(){
		sessionStorage.setItem(('canvas'+this.type+this.tabInd),'')
		setTimeout(()=>{
			this.html()
		},500)
	}
}
</script>

<style scoped>
.demoOne{
	position: relative;
	height: 100vh;
}
.demoOne p{
    color: #ffff;
    position: absolute;
    z-index: 99;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.demoOne .loge{
    left: 0;
    top: 0;
    z-index: 99;
    position: absolute;
}
.demoOne .banner{
    height: 100vh;
}
.demoTwo{
	height: 100vh;
}
.demoTwo p{
    color: #000;
    text-align: center;
    line-height: 25px;
}
.demoTwo .banner{
    width: 100vw;
}
.big{
	position: relative;
}
.big .absolute{
    position: absolute;
    top:0;
    left: 0;
}
.big .opacity{
    opacity: 0;
}
</style>