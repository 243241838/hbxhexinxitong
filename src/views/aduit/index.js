import Template from '@src/template';
import SecondLayout from './layout.vue';
import withdrawAduitview from './withdrawAduitview';
import failorder from './failorder';
import withdrawaldetails from './withdrawaldetails';
module.exports = {
    path: '/aduit',
    component: Template,
    meta: {
        title: '财务管理'
    },
    children: [{
        path: '/',
        component: SecondLayout,
        meta: {
            title: '财务管理'
        },
        children: [{
                path: 'withdrawAduitview',
                name: 'aduit_withdrawAduitview',
                component: withdrawAduitview,
                meta: {
                    title: '代理人提现审核'
                }
            }, {
                path: 'failorder',
                name: 'aduit_failorder',
                component: failorder,
                meta: {
                    title: '失败订单处理'
                }
            },
            {
                path: 'withdrawaldetails',
                name: 'aduit_withdrawaldetails',
                component: withdrawaldetails,
                meta: {
                    title: '提现详情'
                }
            }
        ]
    }]

}