import SecondLayout from './layout.vue';

import orderManage from './orderManage.vue';
import orderDetail from './orderDetail.vue';
import policyManage from './policyManage.vue';
import dealManagePolicyDetails from '../claim/policyDetails';
import dealManagePersonInsuranceProDetail from '../product/personInsuranceProDetail'
import dealManageCarFindListDetail from '../product/carFindListDetail'
import dealStatistics from './dealStatistics.vue';
import moneyDetail from './moneyDeal.vue';
import paymentChannel from './paymentChannel.vue';
import channelSwitch from './channelSwitch.vue';
import paymentRecord from './paymentRecord.vue';
import cancellationManage from './cancellationManage.vue';
const layout = {
  template: `<router-view></router-view>`
}

module.exports = {
  path: '/dealManage',
  component: layout,
  meta: {
    title: '交易管理'
  },
  children:[
    {
      path: '/',
      component: SecondLayout,
      children: [
          {
            path: 'orderManage', 
            component: orderManage,
            meta: {
              title: '订单管理'
            },
            name: 'dealManage_orderManage'
          },
          {
            path: 'orderDetail', 
            component: orderDetail,
            meta: {
              title: '订单详情'
            },
            name: 'dealManage_orderDetail'
          },
          {
            path: 'policyManage', 
            component: policyManage,
            meta: {
              title: '保单管理'
            },
            name: 'dealManage_policyManage'
          },
          {
            path: 'dealManagePolicyDetails', 
            component: dealManagePolicyDetails,
            meta: {
              title: '保单详情'
            },
            name: 'dealManage_dealManagePolicyDetails'
          },
          {
            path: 'dealManagePersonInsuranceProDetail', 
            component: dealManagePersonInsuranceProDetail,
            meta: {
              title: '个险详情'
            },
            name: 'dealManage_dealManagePersonInsuranceProDetail'
          },
          {
            path: 'dealManageCarFindListDetail', 
            component: dealManageCarFindListDetail,
            meta: {
              title: '车险详情'
            },
            name: 'dealManage_dealManageCarFindListDetail'
          },
          {
            path: 'dealStatistics',
            component: dealStatistics,
            meta: {
              title: '交易统计'
            },
            name: 'dealManage_dealStatistics'
          },
          {
            path: 'moneyDetail',
            component: moneyDetail,
            meta: {
              title: '交易明细'
            },
            name: 'dealManage_moneyDeal'
          },
          {
            path: 'paymentChannel',
            component: paymentChannel,
            meta: {
              title: '支付渠道管理'
            },
            name: 'dealManage_paymentChannel'
          },
          {
            path: 'channelSwitch',
            component: channelSwitch,
            meta: {
              title: '渠道开关'
            },
            name: 'dealManage_channelSwitch'
          },
          {
            path: 'paymentRecord',
            component: paymentRecord,
            meta: {
              title: '支付渠道使用记录'
            },
            name: 'dealManage_paymentRecord'
          },
          {
            path: 'cancellationManage', 
            component: cancellationManage,
            meta: {
              title: '退保管理'
            },
            name: 'dealManage_cancellationManage'
          }
      ]
    }
  ]
  
}
