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
		path:'/table',
		name:'table',
		component: Main,
		children: [
			{
				path: 'tableDrag',
				name: 'tableDrag',
				component: () => import('@/views/table/tableDrag.vue'),
			},
			{
				path: 'virtual-scroll',
				name: 'virtual-scroll',
				component: () => import('@/views/table/virtual-scroll.vue'),
			},
			{
				path: 'dg-table',
				name: 'dg-table',
				component: () => import('@/views/table/dg-table.vue'),
			},
		],
	},
	{
		path:'/admin',
		name:'admin',
		component: Main,
		children: [{
			path: 'menuSet',
			name: 'menuSet',
			component: () => import('@/views/admin/menuSet.vue'),
		}],
	},
	{
		path:'/tinymce',
		name:'tinymce',
		component: Main,
		children: [{
			path: 'editor',
			name: 'editor',
			component: () => import('@/views/tinymce/tinymce.vue'),
		}],
	},
	{
		path:'/canvas',
		name:'canvas',
		component: Main,
		children: [{
			path: 'img',
			name: 'img',
			component: () => import('@/views/canvas/meadImg.vue'),
		}],
	},
	{
		path:'/number',
		name:'number',
		component: Main,
		children: [{
			path: 'count-to',
			name: 'count-to',
			component: () => import('@/views/number/count-to.vue'),
		}],
	},
	{
		path:'/CSS',
		name:'CSS',
		component: Main,
		children: [{
			path: 'hover',
			name: 'hover',
			component: () => import('@/views/CSS/hover.vue'),
		}],
	},
	{
		path:'/qrcodejs2',
		name:'qrcodejs2',
		component: Main,
		children: [{
			path: 'downloadImg',
			name: 'downloadImg',
			component: () => import('@/views/qrcodejs2/downloadImg.vue'),
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