import config from '@api/config'
//这个action会被传入一个Object，这个Object里面可能有很多的方法和属性，而你只需要commit方法
const actions = {
    HEADERROUTERS ({commit}, {headerRouters}) {
        commit('HEADER_ROUTERS', headerRouters);
    },
    ADDROUTERS ({commit}, {addRoutes}) {
        return new Promise(resolve => {
            commit('ADD_ROUTERS', addRoutes)
            resolve();
        })
    },
    SETUSER ({commit}, {user}) {
        commit('SET_USER', user)
    },
    SETTOKEN ({commit}, {token}) {
        commit('SET_TOKEN', token);
    },
    REMORETOKEN ({commit}) {
        commit('REMORE_TOKEN');
    },
    USERINFO ({commit}) {
        return new Promise((resolve, reject) => {
            config({url: 'userInfo'}).then(response => {
                commit('USER_INFO', response);
                resolve(response);
            })
        })
    },
    MenuList ({commit}) {
        return new Promise((resolve, reject) => {
            config({url: 'getMenuList'}).then(response => {
                commit('Menu_List', response);
                resolve(response);
            })
        })
    }
}
export default actions;