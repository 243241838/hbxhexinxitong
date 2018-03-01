import Vue from 'vue';

import Cookies from 'js-cookie';

import * as filters from '@src/filters';

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

import ElementUI from '@src/ElementUI';
import store from '@src/store';
import router from '@src/router';
import Index from '@src/index.vue';

import config from '@api/config';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式

// 水波纹指令
import vueWaves from '@src/directive/waves';

// import handleRouter from '@src/utils/handleRouter';
// import {headerSelected, detailLink} from '@src/utils/common';

import ajax from '@api/config';

Vue.use(vueWaves);
let toHome = false;
//全局钩子作用于所有路由，里面的参数to表示即将要进入的路由对象，from表示即将要离开的路由对象 路由进入之前
router.beforeEach((to, from, next) => {
    // 开启Progress
    NProgress.start();
    //重定向到login时
    if (from.path === '/' && to.path === '/login') {
        if (store.getters.token && !store.getters.user) {
            toHome = true;
        }
       
    }
    //登录且有用户信息
    if (store.getters.token && store.getters.user) {
        if (!to.name) {
            // 404
        }
        if (to.path === '/login') {
            next({path: store.getters.headerRouters[0].resourceUrl})
        } else {
            // headerSelected(to, vm);
            // detailLink(to);
            next();
        }
    } else if (store.getters.token && !store.getters.user) {
        // 登录且没有用户信息
        // config({url: 'userInfo'}).then(response => {
        //     store.dispatch('SETUSER', {user: response.data.sysUserPo});
        //     // 获取菜单信息
        //     config({url: 'getMenuList'}).then(response => {
        //         if (toHome) {
        //             handleRouter(response.data, true);
        //         } else {
        //             handleRouter(response.data, false);
        //         }
        //     }).catch();
        // })
        next();
    } else if (to.path === '/login') {
        // 未登录
        next();
    } else {
        next('/login');
    }
    NProgress.done();
});
//路由进入之后
router.afterEach((to, from) => {
    NProgress.done(); // 结束Progress
});

const vm = new Vue({
  el: '#app',
  store,
  router,
  template: '<Index/>',
  components: { Index },
  created () {
  },
  mounted() {
  },
  methods: {
    
  }
});
