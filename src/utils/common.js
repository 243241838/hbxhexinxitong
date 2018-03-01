import store from '@src/store'
import arr from './config';

export function headerSelected (to, vm) {
    store.getters.headerRouters.map((item,index) => {
        if (item.resourceUrl.split('/')[1] == to.path.split('/')[1]) {
            vm.$children[0].$refs.profile.setActiveIndex(index);
        }
    })
}
export function detailLink (to) {
    let path = to.path.split('/')[2];
    //判断去的路径是不是详情当中的某一个，详情对应这相对的模板菜单
    function name () {
        for (let i = 0; i<arr.length;i++) {
            //所有的键名返回的数组
            let key = Object.keys(arr[i])[0];
            if (path == key) {
                return arr[i][key];
            }
        }
    }
    //确定是否是详情页面
    function noExistDetail (item) {
        //非详情页面
        if (item.children[0].href.indexOf('Detail')==-1 && item.children[0].href.indexOf('detail')==-1) {
            return true;
        }
        return false;
    }
    // 详情页刷新
    setTimeout(() => {
        Array.prototype.slice.call(document.getElementsByClassName('listTwo')).map(item => {
            setTimeout(() => {
                if (noExistDetail(item)) {
                    //如果我去的就是详情页面，点击详情页面的时候，对应的模板颜色变成对应的颜色
                    if (item.children[0].href.indexOf(name())!=-1) {
                        item.children[0].className = 'router-link-exact-active router-link-active';
                    }
                }
            }, 0)
        })
    })
    //classname: IE >= 9
    Array.prototype.slice.call(document.getElementsByClassName('listTwo')).map(item => {
        if (noExistDetail(item)) {
            item.children[0].className = '';
        }
        // children: IE >= 8
        setTimeout(() => {
            if (noExistDetail(item)) {
                if (item.children[0].href.indexOf(name())!=-1) {
                    item.children[0].className = 'router-link-exact-active router-link-active';
                }
            }
        }, 0)
    })
}