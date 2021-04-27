<template>
	<el-submenu v-if="item.children && item.children.length>0" :index='item.routerLink || item.id'>
		<template slot="title">
			<i :class="item.icon"></i>
			<span>{{item.name}}</span>
		</template>
		<el-menu-item-group>
			<menusLeft v-for="(child,index) in item.children" :key="index" :item='child'></menusLeft>
		</el-menu-item-group>
	</el-submenu>

	<el-menu-item v-else :index='item.routerLink || item.id'>
		<i :class="item.icon"></i>
		<span slot="title">{{item.name}}</span>
	</el-menu-item>
</template>

<script>
export default {
	name:'menusLeft',
	props:['item']
}
</script>

<style>

</style>