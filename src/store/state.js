import Cookies from 'js-cookie';
import {constantRouterMap} from '@src/router';

const state = {
    headerRouters: (function () {
        if (Cookies.get('headerRouters')) {
            //把JSON格式的字符串转化成为JSON对象
            return JSON.parse(Cookies.get('headerRouters'))
        }
        return null;
    })(),
    routers: constantRouterMap,
    addRoutes: [],
    user: null,
    token: Cookies.get('token'),
    userInfo: null,
    menuList: null
}
export default state;