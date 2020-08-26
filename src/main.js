import Vue from 'vue'
import App from './App.vue'
import router from './router';

Vue.config.productionTip = false

// import axios from 'axios'
// Vue.prototype.$http = axios
import './components/axios/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import '../static/css/t-lib.css'
import '../static/css/t-reset.css'
import '../static/css/component.scss'

import store from './components/lib/store'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import {Chart} from '@antv/g2'
Vue.prototype.$chart = Chart


//时间
import moment from 'moment'
Vue.filter('GMTToStr', function (time) {
  let Str = moment(time).format('YYYY-MM-DD HH:mm:ss')
  return Str
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
