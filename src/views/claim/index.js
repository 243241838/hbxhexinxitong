import Template from '@src/template';
import SecondLayout from './layout.vue';
import toMsgList from './toMsgList';
import toCountMsg from './toCountMsg';
import policyDetails from './policyDetails';
import claimsDetails from './claimsDetails';
import applydetails from './applydetails';
import followupdetails from './followupdetails';
import successdetails from './successdetails';
module.exports = {
    path: '/claim',
    component: Template,
    meta: {
        title: '理赔管理'
    },
    children: [{
        path: '/',
        component: SecondLayout,
        meta: {
            title: '理赔信息管理'
        },
        children: [{
                path: 'toMsgList',
                name: 'claim_toMsgList',
                component: toMsgList,
                meta: {
                    title: '理赔信息管理'
                }
            }, {
                path: 'toCountMsg',
                name: 'claim_toCountMsg',
                component: toCountMsg,
                meta: {
                    title: '理赔统计'
                }
            },
            {
                path: 'policyDetails',
                name: 'claim_policyDetails ',
                component: policyDetails,
                meta: {
                    title: '保单详情'
                }
            },
            {
                path: 'claimsDetails',
                name: 'claim_claimsDetails',
                component: claimsDetails,
                meta: {
                    title: '理赔详情'
                }
            },
            {
                path: 'followupdetails',
                name: 'claim_followupdetails',
                component: followupdetails,
                meta: {
                    title: '跟进详情'
                }
            },
            {
                path: 'applydetails',
                name: 'claim_applydetails',
                component: applydetails,
                meta: {
                    title: '申请理赔详情'
                }
            },
            {
                path: 'successdetails',
                name: 'claim_successdetails',
                component:successdetails,
                meta: {
                    title: '成功理赔详情'
                }
            },
        ]
    }]

}