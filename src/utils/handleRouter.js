import Cookies from 'js-cookie';
import router from '@src/router';
import store from '@src/store';
import * as layout from '@src/layout';
//import * as modules from '@src/modules';


export default function handleRouter (routers, isLogin) {
    return new Promise (resolve => {
        let headerRouters = [];
        let addRoutes = [];
        routers.map(item => {
            let resourceName = item.resourceName;
            //
            item.subMenuList.map((sItem, sIndex) => {
                let obj = {
                    path: '/' + sItem.resourceUrl,
                    component: layout[sItem.resourceUrl],
                    meta: {
                        title: sItem.resourceName
                    },
                    children: []
                }
                sItem.subMenuList.map((tItem, tIndex) => {
                    let inner = {
                        path: tItem.resourceUrl,
                        component: modules[tItem.resourceUrl],
                        meta: {
                            title: tItem.resourceName
                        },
                        name: sItem.resourceUrl + '_' + tItem.resourceUrl
                    }
                    obj.children.push(inner);
                    if (sIndex == 0 && tIndex == 0) {
                        let resourceUrl = '/' + sItem.resourceUrl + '/' + tItem.resourceUrl;
                        headerRouters.push({resourceName, resourceUrl})
                    }
                })
                addRoutes.push(obj);
            })
        })
        // 头路由
        store.dispatch('HEADERROUTERS', {headerRouters});
        // 侧边栏路由
        store.dispatch('ADDROUTERS', {addRoutes}).then(() => {
            router.addRoutes(store.getters.addRoutes);
            if (isLogin) {
                // router.push({path: '/homePage/index'});
                router.push({path: store.getters.headerRouters[0].resourceUrl});
            }
        })
        Cookies.set('headerRouters', headerRouters);
        resolve();
    });
};

export function layoutRouter (pathName) {
    let listInfo = [];
    let isFirst = true;
    store.getters.addRoutes.map((item) => {
        if (item.path.indexOf(pathName) != -1) {
            let obj = {
                img: require('@res/img/item.png'),
                name: item.meta.title,
                hash: item.path + '/' + item.children[0].path,
                status: isFirst,
                list: []
            }
            item.children.map((innerItem) => {
                let innerObj = {
                    hash: item.path + '/' + innerItem.path,
                    nameTwo: innerItem.meta.title,
                    hidden: innerItem.path.indexOf('Detail') != -1 || innerItem.path.indexOf('detail') != -1 ? true : false
                }
                obj.list.push(innerObj);
            })
            listInfo.push(obj);
            isFirst = false;
        }
    })
    return listInfo;
}
