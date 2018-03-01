import {asyncRouterMap, constantRouterMap} from '@src/router';

const mutations = {
    HEADER_ROUTERS (state, headerRouters) {
        state.headerRouters = headerRouters;
    },
    ADD_ROUTERS (state, routers) {
        state.addRoutes = routers;
        state.routers = constantRouterMap;
    },
    SET_USER (state, user) {
        state.user = user;
    },
    SET_TOKEN (state, token) {
        state.token = token;
    },
    REMORE_TOKEN (state) {
        state.token = null;
    },
    USER_INFO (state, userInfo) {
        state.userInfo = userInfo;
    },
    Menu_List (state, menuList) {
        state.menuList = menuList;
    }
}
export default mutations;