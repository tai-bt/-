<template>
	<div @mousemove="move">
		<!-- <span class="hoverOne hand">
			1111
		</span>
		<br>
		<img id="blur" class="blur" src="../../assets/BGIMG2.jpg" alt="">

		<div class="reflect">
			<img src="../../assets/backgroundimg.png" alt="">
		</div> -->

		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide">Slide 1</div>
				<div class="swiper-slide">Slide 2</div>
				<div class="swiper-slide">Slide 3</div>
			</div>
			<!-- 如果需要分页器 -->
			<div class="swiper-pagination"></div>
			
			<!-- 如果需要导航按钮 -->
			<div class="swiper-button-prev"></div>
			<div class="swiper-button-next"></div>
			
			<!-- 如果需要滚动条 -->
			<div class="swiper-scrollbar"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			
		}
	},
	methods:{
		move(e){
			// var blur = document.getElementById('blur')
			// blur.style.transform = `translate(${-(e.clientX * 0.05)}px,${-(e.clientY * 0.05)}px)`
		},
		swiper(){
			var mySwiper = new Swiper ('.swiper-container', {
				// direction: 'vertical', // 垂直切换选项
				loop: true, // 循环模式选项
				mousewheel: true,
					releaseOnEdges: true,
				
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
				},
				
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				
				// 如果需要滚动条
				scrollbar: {
					el: '.swiper-scrollbar',
				},
			}) 
		}
	},
	mounted(){
		this.swiper()
	}
}
</script>

<style lang='scss' scoped>
.hoverOne{
	width: 150px;
	position: relative; 
	text-align: center;
	background-color: antiquewhite;
	line-height: 40px;
	display: inline-block;
}
.hoverOne::before, .hoverOne::after {
	box-sizing: inherit;
	position: absolute;
	content: '';
	border: 2px solid transparent;
	width: 0;
	height: 0;
}

.hoverOne::after {
	bottom: 0;
	right: 0;
}

.hoverOne::before {
	top: 0;
	left: 0;
}

.hoverOne:hover::before, .hoverOne:hover::after {
	width: 100%;
	height: 100%;
}

.hoverOne:hover::before {
	border-top-color: #4361ee;
	border-right-color: #4361ee;
	transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
}

.hoverOne:hover::after {
	border-bottom-color: #4361ee;
	border-left-color: #4361ee;
	transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
}

.blur{
	width: 50%;
	margin-left: 25%;
	margin-top: 10%;
}
.blur:hover{
	filter: blur(7px);
}

.reflect{
	-webkit-box-reflect: below 1px 
		-webkit-gradient(
			linear, left top, left bottom, 
			color-stop(30%, transparent),
			from(transparent), 
			to(rgba(250, 250, 250, 0.7))
		);
	img {
		width: 30%;
		
	}
}


.swiper-slide{
	height: 60px;
	background-color: aquamarine;
}
</style>