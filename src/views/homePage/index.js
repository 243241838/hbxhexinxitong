import Template from '@src/template';
import SecondLayout from './layout.vue';
import index from './index.vue';
module.exports = {
    path:'/homePage',
    component: Template,
    meta: {
        title: '我的主页'
    },
    children: [
        {
            path: '/',
            component: SecondLayout,
            children: [
                {
                    path:'index',
                    component:index,
                    name:"homepage_index",
                    meta: {
                        title: '首页'
                    }
                }
            ]
        }
    ]
}
