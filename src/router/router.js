import Main from '../views/Main.vue';


export const navRouter = [
    {
        path: '/',
        redirect: '/home/index',
	}, 
	{
		path:'/home',
		name:'home',
		component: Main,
		children: [{
			path: 'index',
			name: 'index',
			component: () => import('@/components/HelloWorld.vue'),
		}],
	},
	{
		path:'/echarts',
		name:'echarts',
		component: Main,
		children: [{
			path: 'echartsMap',
			name: 'echartsMap',
			component: () => import('@/views/echarts/echartsMap.vue'),
		}],
	},
	{
		path:'/register',
		name:'register',
		component: () => import('@/components/login/register.vue'),
	},
	{
		path:'/login',
		name:'login',
		component: () => import('@/components/login/login.vue'),
	}
]

const routers = [
    ...navRouter,
];
export default routers;