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
		children: [{
			path: 'tableDrag',
			name: 'tableDrag',
			component: () => import('@/views/table/tableDrag.vue'),
		}],
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