import Vue from 'vue';
import axios from 'axios';
import { Loading, Message } from 'element-ui';

// Vue.prototype.axios = axios

// 设置超时时间为60秒
axios.defaults.timeout = 60000;
// 统一设置请求头格式
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const options = {
	lock: true,
	text: '数据正在努力计算中，请勿关闭网页......',
	spinner: 'el-icon-loading',
	background: 'rgba(0, 0, 0, 0.7)',
};
let num = 0;

// 请求拦截器
axios.interceptors.request.use((config) => {
	const obj = config;
	num += 1;
	if (num > 0) {
		Loading.service(options);
	}
	// 每次发送请求都自动在header中附加token值
	obj.headers.token = window.localStorage.getItem('token');
	obj.headers.post['cache-control'] = 'no-cache'; // 清除get请求缓存
	obj.headers.post.Pragma = 'no-cache'; // 清除get请求缓存
	return obj;
}, (error) => {
  	console.log(error);
});

// 响应拦截器
axios.interceptors.response.use((response) => {
	num -= 1;
	if (num <= 0) {
		Loading.service(options).close();
	}
	if (response.data.code === 0) {
		// 0 正常状态，直接返回
		// if (response.data.message || response.data.msg) {
		//   if (response.data.message === '查询成功' || response.data.message === '操作成功！' || response.data.message === 'SUCCESS' || response.data.message === 'SUCCESS') {
		//   } else {
		//     Message.success(response.data.message || response.data.msg);
		//   }
		// }
	} else {
		// if (response.data.message || response.data.msg ){
		if(response.data.message == '服务器未知错误！'){
			Message({
				dangerouslyUseHTMLString: true,
				type:'warning',
				message: '服务器未知错误，请尝试刷新页面，如需帮助请联系产品专属顾问-刘畅159-0118-7809'
			});
		}else{
			Message.warning(response.data.message || response.data.msg);
		}
		// }
	};
	return response;
}, (error) => {
  	--num
	if(num<=0){
		Loading.service(options).close();
	}
  // 地址未找到会返回到error
	console.log("响应拦截器异常：" + error);
	//if(error.response.stat)
	switch (error.response.status) {
		// 未找到服务
		case 404:
		Message.error("服务未找到:" + error.response.config.url);
		break;
		//
		case 504:
		Message.error("网关超时:" + error.response.config.url);
		break;
		default:
			console.log(error.response);
		break;
	}
})

/**
 * 对axios的get封装
 * 进行统一异常处理
 * 后台方法接受对象参数用Json传递，如果是简单的id就用url?param1=a&param2=b的形式
 */
Vue.prototype.$get = function (url) {
	return new Promise((resolve, reject) => {
		axios.get(url).then(response => {
			if (response.data.code === 0) {
				resolve(response)
			} else {
				// Message.warning(response.data.msg)
			}
		}).catch(error => {
			console.log("get请求异常：" + error)
		})
	})
}

/**
 * 对axios的post封装
 * 进行统一处理
 * 后台方法接受对象参数用Json传递，如果是简单的id就用url?param1=a&param2=b的形式
 */
Vue.prototype.$post = function (url, data) {
	if (data === undefined) {
		data = {}
	}
	return new Promise((resolve, reject) => {
		axios.post(url, data).then(response => {
			if (response.data.code === 0) {
				resolve(response)
			} else {
				// Message.warning(response.data.msg)
			}
		}).catch(error => {
			console.log("post请求异常：" + error)
		})
	})
}

export default {
}