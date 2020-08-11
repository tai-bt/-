import Vue from 'vue';
import VueRouter from 'vue-router';
import routers from './router';

Vue.use(VueRouter);
const RouterConfig = {
  routes: routers,
};

const router = new VueRouter(RouterConfig);

router.beforeEach((to,from,next)=>{
  if(!sessionStorage.getItem('userId') && to.path != '/login' && to.path != '/register'){
    if(to.path == '/register'){
      next({name:'register'})
    }else{
      next({name:'login'})
    }
  }else{
    next()
  }
})

export default router;
