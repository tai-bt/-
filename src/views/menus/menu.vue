<template>
	<div>
		<div v-for="(item,index) in menuList" :key="index">
			<el-submenu v-if="item.children && item.children.length>0" :index='item.id'>
				<template slot="title">
					<i :class="item.icon"></i>
					<span>{{item.name}}</span>
				</template>
				<el-menu-item-group>
					<menusLeft :menuList='item.children'></menusLeft>
				</el-menu-item-group>
			</el-submenu>

			<el-menu-item v-else :index='item.id'>
				<i :class="item.icon"></i>
				<span slot="title">{{item.name}}</span>
			</el-menu-item>
		</div>
	</div>
</template>

<script>
export default {
	name:'menusLeft',
	props:['menuList']
}
</script>

<style>

</style>