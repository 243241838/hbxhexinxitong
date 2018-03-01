

// const router = new VueRouter({
//   //滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
//   scrollBehavior: () => ({ y: 0 }),
//   routes: constantRouterMap
// })

// export default router;
import Vue from 'vue';
import VueRouter from 'vue-router';
import Cookies from 'js-cookie';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式

import login from '@views/login.vue';
import main from '@src/main.vue';
import user from '@views/user';
import operate from '@views/operate';
import product from '@src/views/product';
import systemManage from '@views/systemManage'; //系统管理
import dealManage from '@views/dealManage'; //交易
import clientSide from '@views/clientSide'; //客户端
import claim from '@views/claim';
import content from '@views/content';
import aduit from '@views/aduit';
import channelmanager from '@views/channelmanager';
Vue.use(VueRouter)

const routes = [
  {
    path: '/login', component: login
  },
  {
    path: '/main',
    component: main
  },
  user,systemManage,operate,product, dealManage, clientSide,claim,content,aduit,channelmanager
];
const router = new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start(); // 开启Progress
  if (Cookies.user) { // 判断是否有登录
    if (to.path === '/login') {
      next({ path: '/' });
    }else{
      next();
    }
  } else {
    console.log('--')
  }
  next();
  NProgress.done();
});
router.afterEach(() => {
  NProgress.done(); // 结束Progress
});

export default router;
